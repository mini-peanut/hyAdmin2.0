import _ from 'lodash';
import invariant from 'invariant';
const DEFAULT_PREFIX = '@hy';


export const proxyStateForUI = (st, prefix) => {
    if (!prefix) {
      return st;
    }

    const state = _.cloneDeep(st);
    Object.keys(state).map(namespace => {
        if (prefix && prefix[namespace]) {
            state[namespace] = state[namespace][prefix[namespace]];
        } else {
            state[namespace] = state[namespace][DEFAULT_PREFIX];
        }
    });
    return state;
};

export function proxyModel(m) {
    let {prefix, state, reducers} = m;

    return {
        ...m,
        state: prefix ? proxyState(state, prefix): state,
        reducers: {
          ...(prefix ? proxyReducers(reducers): reducers),
          hyBaseReducer(state, { payload }) {
            return {
              ...state,
              ...payload
            };
          }
      }
    }
}

export function proxyState(state, prefix) {

    return prefix.reduce((ret, key) => {
        ret[key] = state;
        return ret;
    }, {});
}
// 在state[prefix] 下更新数据
export function proxyReducers(reducers) {
    return Object.keys(reducers).reduce((ret, key) => {
        ret[key] = (state, action) => {
            const prefix = action.meta.prefix;
            const _state = prefix ? state[prefix] : state;
            const result = reducers[key](_state, action);

            return {
                ...state,
                ...(prefix ? {[action.meta.prefix]: {...result}} : result)
            };
        };
        return ret;
    }, {});
}

// dispatch时为action 附加一个参数prefix， prefix所在model根据action.type判断
// 使reducer可以在正确的位置更新状态
export const proxyDispatch = (dispatch, key, prefix) => {

    return action => {
        let proxyModel;
        const isNeedToProxy = action.type && prefix
          && Object.keys(prefix).some(model => model === action.type.split('/')[0] && ((proxyModel = model) || true));

        dispatch({
            ...action,
            meta: {
              ...(isNeedToProxy ? {prefix: prefix[proxyModel]} : {}),
              _callback: key
            },
        });
    };
};

// 拿到state[prefix]下的数据
export const proxyGetState = (getState, prefix) => {

    return () => {
        const state = {...getState()};

        prefix && Object.keys(state).map(namespace => {
            if (prefix && prefix[namespace]) {
                state[namespace] = state[namespace][prefix[namespace]];
            } else {
                state[namespace] = state[namespace][DEFAULT_PREFIX];
            }
        });

        return state;
    };
};

export const proxyMapDispatchToProps = (app, callbacks, prefix) => {
    const initializedCallbacks = {};

    return !callbacks ? undefined : function() {
        const prefixCacheKey = JSON.stringify(prefix);

        if (!initializedCallbacks[prefixCacheKey]) {
            initializedCallbacks[prefixCacheKey] = {};

            invariant(
                _.isPlainObject(callbacks),
                'dva->$connect: callbacks should be plain object'
            );

            Object.keys(callbacks).map((key) => {

                invariant(
                    typeof callbacks[key] === 'function',
                    'dva->$connect: callbacks\'s each item should be function, but found ' + key
                );

                initializedCallbacks[prefixCacheKey][key] = function(...args) {
                    const dispatch = proxyDispatch(app._store.dispatch, key, prefix);
                    callbacks[key].call(null, {
                        getState: proxyGetState(app._store.getState, prefix),
                        dispatch: proxyDispatch(app._store.dispatch, key, prefix),
                        changeModel: (namespace, payload) => {
                          dispatch({
                            type: `${namespace}/hyBaseReducer`,
                            payload
                          });
                        }
                    }, ...args);
                }
            });
        }
        return initializedCallbacks[prefixCacheKey];
    };
}
