import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  // if(true){
	// 	return true
	// }


  try {
    roles.forEach((item, index) => {
//    console.log('1' + item)
		    var tit = route.name
//		    console.log('2' + tit)
		    if (item == tit) {
        //	    	alert("true")
			  	throw 'true'
        //		  	return roles.some(role => route.meta.roles.includes(role))
		    } else {
//			  console.log('33' + tit)
      }
    })
  } catch (e) {
	    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
var i = 1
function filterAsyncRouter(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
//  console.log(roles)
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles)
      }
      i++
      //   if(i<=5){
//    console.log('tmp:' + tmp)
      res.push(tmp)
      //   }
    }
  })
//console.log('res:=====================================' + i)
//console.log(res)
  return res
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { permission } = data
        let accessedRouters
        console.log("---------------------------------------")
        console.log(data)
        accessedRouters = filterAsyncRouter(asyncRouterMap, permission)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
