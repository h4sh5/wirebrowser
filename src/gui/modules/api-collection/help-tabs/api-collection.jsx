import HelpTab, { Section } from "@/components/help-tab.jsx";
import imgNewFile from "@/assets/images/help-files-new.png";

const ApiCollctiontHelpTab = ({ onDismiss }) => {
  return (
    <HelpTab
      title="API Collection"
      subtitle="The API Collection section lets you organize, test, and manage your API requests directly within Wirebrowser"
      onDismiss={onDismiss}
    >
      <>
        <Section>
          You can create new requests or import them directly from the Network section, organize them into folders, and quickly run or edit them whenever needed. <br />
        </Section>
        <Section className="mt-3">
          Variables make your requests dynamic and reusable. <br />
          For example: GET https://api.example.com/users/<span className="text-success">{"{{userId}}"}</span>
        </Section>
        <Section>
          To create a new request or folder, use the context menu on the root folder.
          <div className="mt-5">
            <img src={imgNewFile} className="w-38 h-auto" />
          </div>
        </Section>
      </>
    </HelpTab>
  )
};

export default ApiCollctiontHelpTab;