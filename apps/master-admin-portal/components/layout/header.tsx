
'use client'

import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { Bell, Search, Settings, User, LogOut, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

interface HeaderProps {
  onMenuToggle: () => void
  isMenuOpen: boolean
}

export default function Header({ onMenuToggle, isMenuOpen }: HeaderProps) {
  const { data: session } = useSession()
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchValue.trim()) {
      // Implement global search functionality
      console.log('Searching for:', searchValue)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Left section - Logo and Menu Toggle */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuToggle}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-white">Audityzer</h1>
              <p className="text-xs text-gray-400 -mt-1">Ecosystem Portal</p>
            </div>
          </Link>
        </div>

        {/* Center section - Search */}
        <div className="flex-1 max-w-md mx-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search across all platforms..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
            />
          </form>
        </div>

        {/* Right section - Actions and User Menu */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative text-gray-400 hover:text-white">
                <Bell className="h-5 w-5" />
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-gray-800 border-gray-700">
              <DropdownMenuLabel className="text-white">Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                <div>
                  <p className="font-medium">Analytics System Alert</p>
                  <p className="text-sm text-gray-400">High CPU usage detected - 2 min ago</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                <div>
                  <p className="font-medium">New User Registration</p>
                  <p className="text-sm text-gray-400">3 new users joined - 15 min ago</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                <div>
                  <p className="font-medium">System Update Complete</p>
                  <p className="text-sm text-gray-400">Multi-tenant platform updated - 1 hour ago</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || ''} />
                  <AvatarFallback className="bg-blue-600 text-white">
                    {session?.user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700" align="end">
              <DropdownMenuLabel className="text-white">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{session?.user?.name}</p>
                  <p className="text-xs text-gray-400">{session?.user?.email}</p>
                  <Badge variant="secondary" className="w-fit text-xs">
                    {session?.user?.role}
                  </Badge>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem asChild className="text-gray-300 hover:bg-gray-700">
                <Link href="/profile" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="text-gray-300 hover:bg-gray-700">
                <Link href="/profile/settings" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem 
                onClick={() => signOut()}
                className="text-red-400 hover:bg-gray-700 hover:text-red-300"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
