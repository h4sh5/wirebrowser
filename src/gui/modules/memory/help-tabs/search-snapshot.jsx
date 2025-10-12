import HelpTab, {Section} from "@/components/help-tab.jsx";

const SearchSnapshotHelpTab = ({ onDismiss }) => {
  return (
    <HelpTab
      title="Heap Snapshot Search"
      subtitle="Here you can search objects in the Browser's memory"
      onDismiss={onDismiss}
    >
      <>
        <Section>
          The Heap Snapshot panel lets you explore the contents of a JavaScript heap snapshot and search for objects based on keys and values.
          This is useful to locate objects that may not be directly reachable from global variables, or to inspect hidden references.
        </Section>
      </>
    </HelpTab>
  )
};

export default SearchSnapshotHelpTab;