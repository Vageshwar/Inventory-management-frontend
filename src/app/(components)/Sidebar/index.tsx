"use client";

import React from 'react'
import {Menu, LucideIcon, Layout, Archive, Clipboard, SlidersHorizontal, Users, CircleDollarSign} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setIsSidebarCollapsed } from '@/state';
import { usePathname } from 'next/navigation';
import Link from 'next/link';


const SIDE_BAR_LINKS = [
    {
        href: '/dashboard',
        icon:  Layout,
        label: 'Dashboard',
    },
    {
        href: '/inventory',
        icon:  Archive,
        label: 'Inventory',
    },
    {
        href: '/products',
        icon:  Clipboard,
        label: 'Products',
    },
    {
        href: '/users',
        icon:  Users,
        label: 'Users',
    },
    {
        href: '/settings',
        icon:  SlidersHorizontal,
        label: 'Settings',
    },
    {
        href: '/expenses',
        icon:  CircleDollarSign,
        label: 'Expenses',
    },
]

interface SidebarLinkProps {
    href: string;
    icon: LucideIcon;
    label: string;
    isCollapsed: boolean;

}

const SidebarLink = ({
    href,
    icon: Icon,
    label,
    isCollapsed,

}: SidebarLinkProps) => {
    const pathname = usePathname();
    const isActive = pathname === href || (pathname === '/' && href === '/dashboard');

    return (
        <Link href={href}>
            <div className={`cursor-pointer flex items-start ${isCollapsed ? 'justify-center py-4': 'justify-start px-8 py-4'} hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${isActive ? 'bg-blue-200 text-white': ''}`}>
                <Icon className='w-6 h-6 !text-gray-700'/>
                <span className={`${isCollapsed ? 'hidden': 'block'} font-medium text-gray-700`}>{label}</span>
            </div>
        </Link>
    )
}

const Sidebar = () => {
  const isSidebarCollapsed = useAppSelector(state => state.global.isSidebarCollapsed);
  const dispatch = useAppDispatch();

  const toggleSideBar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  }

  const sidebarClassNames = `fixed flex flex-col ${isSidebarCollapsed ? 'w-0 md:w-16': 'w-72 md:w-64'} bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={sidebarClassNames}>
        <div className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${isSidebarCollapsed ? 'px-5' : 'px-8'}`}>
            <div>Logo</div>
            <h1 className={`font-extrabold text-2xl ${isSidebarCollapsed ? 'hidden' : 'block'}`}>GG-Interiors</h1>
            <button className='md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100' onClick={toggleSideBar}>
                <Menu />
            </button>
        </div>
        {/* LINKS */}
        <div className='flex-grow mt-8'>
            {
                SIDE_BAR_LINKS.map((link) => <SidebarLink {...link} isCollapsed={isSidebarCollapsed} />)
            }
        </div>
        <div className={`${isSidebarCollapsed ? 'hidden': 'block'} mb-10`}>
            <p className={`text-center text-xs text-gray-500`}>&copy; 2024 GG Int.</p>
        </div>
    </div>
  )
}

export default Sidebar