import Header from "../atoms/Header";
import NavigationBar from "./NavigationBar";

const PageWrapper: React.FC<{
  header: string;
  children: React.ReactNode;
}> = ({ header, children }) => {
  return (
    <div className="flex flex-col h-screen w-screen bg-gray-100">
      <NavigationBar />
      <Header header={header} />
      {children}
    </div>
  );
};

export default PageWrapper;
