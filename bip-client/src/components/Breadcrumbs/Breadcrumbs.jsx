import { Breadcrumb } from 'antd'
import { Link, useLocation } from 'react-router-dom'

export function Breadcrumbs({ routes }) {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((item) => item !== '')

  const findRoute = (routes, pathname) => {
    for (let route of routes) {
      if (route.path === pathname) {
        return route
      }
      if (route.routes) {
        const nestedRoute = findRoute(route.routes, pathname)
        if (nestedRoute) {
          return nestedRoute
        }
      }
    }
    return null
  }

  const breadcrumbItems = pathnames.map((pathname, index) => {
    const matchedRoute = findRoute(
      routes,
      `/${pathnames.slice(0, index + 1).join('/')}`
    )
    const name = matchedRoute ? matchedRoute.name : pathname
    const isLastItem = index === pathnames.length - 1

    return (
      <Breadcrumb.Item key={index}>
        {isLastItem ? (
          name
        ) : (
          <Link to={`/${pathnames.slice(0, index + 1).join('/')}`}>{name}</Link>
        )}
      </Breadcrumb.Item>
    )
  })

  return (
    <Breadcrumb
      style={{
        margin: '16px 0',
      }}
    >
      {breadcrumbItems}
    </Breadcrumb>
  )
}
