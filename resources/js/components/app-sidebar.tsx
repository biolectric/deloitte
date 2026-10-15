import { Link } from '@inertiajs/react';
import {
    CalendarDays,
    ExternalLink,
    LayoutGrid,
    MessageSquareText,
    Music2,
    Video,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Song requests',
        href: '/dashboard/songs',
        icon: Music2,
    },
    {
        title: 'Messages',
        href: '/dashboard/messages',
        icon: MessageSquareText,
    },
    {
        title: 'Announcement',
        href: '/dashboard/announcement',
        icon: Video,
    },
    {
        title: 'Advent calendar',
        href: '/dashboard/advent',
        icon: CalendarDays,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Public site',
        href: '/',
        icon: ExternalLink,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
