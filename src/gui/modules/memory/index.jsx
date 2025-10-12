import MainTabs from "@/components/main-tabs.jsx";
import SearchSnapshot from "@/modules/memory/search-snapshot";
import SearchRuntime from "@/modules/memory/search-runtime";
import SearchClasses from "@/modules/memory/search-classes";


const Memory = () => {
  const tabItems = [
    {
      key: "search-snapshot",
      label: "Heap Snapshot",
      children: <div className="h-[calc(100vh-95px)]"><SearchSnapshot /></div>
    },
    {
      key: "runtime-objects",
      label: "Runtime Objects",
      children: <div className="h-[calc(100vh-70px)]"><SearchRuntime /></div>
    },
    {
      key: "class-instances",
      label: "Class Instances",
      children: <div className="h-[calc(100vh-70px)]"><SearchClasses /></div>
    },
  ]

  return (
    <MainTabs
      items={tabItems}
      className="flex-1 flex flex-col"
    />
  );

}


export default Memory;