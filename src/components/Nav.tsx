'use client'
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import {  signIn, signOut, useSession, getProviders } from "next-auth/react"

type ProviderType = {
  id: string;
  name: string;
}

const Nav = () => {
  const {data: session, status } = useSession()

  const [providers, setProviders] = useState<ProviderType[] | unknown>(null)
  const [dropDownMenu, setDropDownMenu] = useState(false)

  useEffect(() => {
    const setProvidersf = async () => {
      const response = await getProviders();

      console.log(response);
      setProviders(response)
    }

    setProvidersf()
  }, [])

  console.log(session?.user)

  return (
    <nav  className="flex-between w-full mb-16 pt-3">
      <Link href='/' className="flex gap-2 flex-center">
        <Image 
          src='/assets/images/logo.svg'
          alt="promptopia logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>


      {/* Desktop navigation*/}
      <div className="sm:flex hidden">
        {session?.user.id ? (
          
          <div className="flex gap-3 md:gap-5">
            <Link
              href='/create-prompt'
              className="black_btn"
            >
              Create Post
            </Link>
            <Link
              href='/profile'
              className="outline_btn"
            >
              My Profile
            </Link>
            <button
              type="button"
              onClick={() => signOut()}
              className="outline_btn"
            >
              Sign Out
            </button>

            <Image 
              src={session?.user.image || '/assets/images/logo.svg'}
              width={37}
              height={37}
              alt="profile"
              className="rounded-full"
            />

          </div>
          
        ) : (
          <>
            {providers && 
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))
              
            }
          </>
        )}
      </div>

      {/* mobile navigation*/}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image 
              src={session?.user.image || '/assets/images/logo.svg'}
              width={37}
              height={37}
              alt="profile"
              className="rounded-full"
              onClick={() => setDropDownMenu((prev) => !prev)}
            />
            {dropDownMenu && (
              <div className="dropdown">
                <Link
                  href='/profile'
                  className="dropdown_link"
                  onClick={() => setDropDownMenu(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className="dropdown_link"
                  onClick={() => setDropDownMenu(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setDropDownMenu(false)
                    signOut()
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers && 
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))
              
            }
          </>
        )}

      </div>
    </nav>
  )
}

export default Nav