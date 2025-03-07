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
      <div className="px-6 max-w-4xl flex-1 overflow-y-auto w-screen mx-auto">
        {children}
      </div>
    </div>
  );
};

export default PageWrapper;
