export function findRouterChain(routesSource, name) {
	const result = []
	routesSource.forEach(item => {
		if (item.name === name) {
			result.push(item.name)
		} else {
			if (item.children && item.children.length > 0) {
				const temp = findRouterChain(item.children, name)
				if (temp.length > 0) {
					console.log(temp)
					result.push(item.name, ...temp)
				}
			}
		}
	})

	return result
}

