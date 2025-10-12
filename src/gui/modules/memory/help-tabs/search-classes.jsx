import HelpTab, {Section} from "@/components/help-tab.jsx";

const SearchClasesHelpTab = ({ onDismiss }) => {
  return (
    <HelpTab
      title="Search Classes"
      subtitle="The Class Instances section lets you find all live objects in memory that share a specific prototype."
      onDismiss={onDismiss}
    >
      <>
        <Section>
          By specifying an object’s prototype (for example, MyClass.prototype), Wirebrowser returns every active instance of that class currently referenced in the browser’s runtime.
        </Section>
        <Section>
          This feature is a convenient wrapper around page.queryObjects(), making it easy to:
          <br />
          <ul className="text-left mt-5 mb-10 list-disc! ml-4">
            <li>Inspect all existing instances of a given class.</li>
            <li>Explore their current state and properties.</li>
          </ul>
        </Section>
        <Section>
          Use this tool to analyze object lifecycles and confirm which class instances remain active in memory.
        </Section>
      </>
    </HelpTab>
  )
};

export default SearchClasesHelpTab;