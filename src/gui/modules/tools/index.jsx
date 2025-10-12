
import Decoder from "@/modules/tools/decoder";
import Jwt from "@/modules/tools/jwt";
import MainTabs from "@/components/main-tabs.jsx";


const Tools = () => {

  const tabItems = [
    {
      key: "decoder",
      label: "Decoder",
      children: <div className="h-[calc(100vh-70px)]"><Decoder /></div>
    },
    {
      key: "jwt",
      label: "JWT",
      children: <div className="h-[calc(100vh-70px)]"><Jwt /></div>
    }
  ]

  return (
    <MainTabs
      items={tabItems}
      className="flex-1 flex flex-col"
    />
  );
}


export default Tools;