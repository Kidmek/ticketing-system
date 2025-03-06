import LogoutButton from "../atoms/LogoutButton";

const NavigationBar: React.FC = () => (
  <nav className="bg-gray-800 p-4 flex justify-between items-center">
    <h1 className="text-white text-xl font-bold">Ticket System</h1>
    <LogoutButton />
  </nav>
);

export default NavigationBar;
