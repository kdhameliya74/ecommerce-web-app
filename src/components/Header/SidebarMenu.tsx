import { X } from 'lucide-react';
import { NavLink } from 'react-router';

interface SideMenuProps {
    open: boolean;
    onClose: () => void;
    navLinks: Array<{ name: string; path: string }>;
}

const SideMenu: React.FC<SideMenuProps> = ({ open, onClose, navLinks }) => {
    return (
        <div
            className={`fixed top-0 shadow-md left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out
        ${open ? 'translate-x-0' : '-translate-x-full'}
      `}
        >
            <div className="flex justify-between items-center p-4 border-b">
                <span className="font-semibold text-lg">Menu</span>
                <button onClick={onClose}>
                    <X className="w-6 h-6" />
                </button>
            </div>

            <nav className="flex flex-col p-4 space-y-4 text-lg">
                {navLinks.map((link, index) => (
                    <NavLink key={index} to={link.path}>
                        {link.name}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default SideMenu;
