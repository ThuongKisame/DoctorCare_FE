import SidebarAdmin from '@/components/common/SidebarAdmin';

function AdminLayout({ children }) {
    return (
        <div>
            <div className="h-2 bg-primary"></div>
            <div className="flex ">
                <SidebarAdmin />
                <div className="flex-1">{children}</div>
            </div>
        </div>
    );
}

export default AdminLayout;
