import { NavLink, Outlet } from 'react-router-dom'
import './navigation.css'
function Navigation() {
  return (
    <>
      <div id="sidebar" className="flex flex-col h-full">
        <nav>
          <ul>
            <li className='flex flex-col'>
              <NavLink to={`calendar`} className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""}>
                Calendar1
              </NavLink>
              <NavLink to={`sites`} className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""}>
                Sites
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div id="content" className='flex w-full'>
        <Outlet></Outlet>
      </div>
    </>
  )
}

export default Navigation
