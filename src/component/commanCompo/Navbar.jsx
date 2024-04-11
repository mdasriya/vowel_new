import { Fragment, useContext, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCartOpen } from '../../slices/cartSlice'
import { logout } from '../../services/opretions/userApi'
// import ThemeContext from './ThemeContext'
// import Product from './Product'

// const user = {
//   Name: 'Tom Cook',
//   Email: 'tom@example.com',
//   Image:
//     'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
// }
const navigation = [
  { name: 'Products', href: '/', current: true, AccountType : "User" },
  { name: 'CreateProduct', href:'/product/createProduct', current: true, AccountType : "Admin"}
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { totalItems, cartData, cartOpen } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const openCart = () => {
    dispatch(setCartOpen());
    console.log("cartOpen ", cartOpen);
    console.log("cartData : ", cartData);
    console.log("User : ", user);
  }

  const logoutHandler = async () => {
    await logout(navigate, dispatch);
  }

  //   useEffect(() => {
  //     console.log("component render")
  //   }, [theme])

  return (
    <>
      <div className="min-h-full  w-[100%]">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className=""
                        src="https://www.vowelweb.com/wp-content/uploads/2022/06/vowelweb-logo.png"
                        alt="Your Company"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        <a className=' text-lg text-gray-300 hover:text-gray-100' href="/">Products</a>
                        {
                          user && user.AccountType === "Admin" &&
                          <a className=' text-lg text-gray-300 hover:text-gray-100' href='/product/createProduct'>CreateProduct</a>
                        }
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">

                      <button
                        type="button"
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                      {/* Cart */}
                      <div className="ml-4 flow-root lg:ml-6 mr-4">
                        <div onClick={() => openCart()} className="group -m-2 flex items-center p-2 relative">
                          <ShoppingBagIcon
                            onClick={() => openCart()}
                            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-300"
                            aria-hidden="true"
                          />
                          <div onClick={() => openCart()} className="ml-2 absolute top-4 left-4 bg-green-500 w-3 rounded-full px-2 text-center flex justify-center text-sm font-medium text-gray-200 group-hover:text-gray-50">{totalItems}</div>
                          <span className="sr-only">items in cart, view bag</span>
                        </div>
                      </div>

                      {
                        user ? (
                          <Menu as="div" className="relative ml-3">
                            <div>
                              <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">Open user menu</span>
                                <img className="h-8 w-8 rounded-full" src={user.Image} alt="" />
                              </Menu.Button>
                            </div>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <Menu.Item >
                                  <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer block px-4 py-2 text-sm text-gray-700'>Your Profile</div>
                                </Menu.Item>
                                <Menu.Item >
                                  <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer block px-4 py-2 text-sm text-gray-700'>Settings</div>
                                </Menu.Item>
                                <Menu.Item >
                                  <div onClick={logoutHandler} className='bg-gray-100 hover:bg-gray-200 cursor-pointer block px-4 py-2 text-sm text-gray-700'>Sign out</div>
                                </Menu.Item>
                                {/* {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))} */}
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        ) : (
                          <div>
                            <button type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ml-4" onClick={() => navigate("/signIn")}>Sign In</button>

                            <button type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ml-4" onClick={() => navigate("/signUp")}>Sign Up</button>
                          </div>
                        )
                      }


                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      {
                        user && <img className="h-10 w-10 rounded-full" src={user.Image} alt="" />
                      }

                    </div>
                    <div className="ml-3">
                      {
                        user && <> <div className="text-base font-medium leading-none text-white">{user.Name}</div>
                          <div className="text-sm font-medium leading-none text-gray-400">{user.Email}</div></>
                      }

                    </div>
                    <button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"

                        onClick={item.name === "Sign out" ? logoutHandler : undefined}

                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>

                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{/* Your content */}</div>
        </main>
      </div >
    </>
  )
}
