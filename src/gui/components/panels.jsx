import { Panel as P, PanelGroup as PG, PanelResizeHandle as RP } from "react-resizable-panels";

export const Panel = (props) => (
  <P {...props}>
    {props.children}
  </P>
)

export const PanelGroup = (props) => (
  <PG {...props}>
    {props.children}
  </PG>
)

export const PanelResizeHandle = (props) => (
  <RP
    {...props}
    className={`hover:bg-gray-400 transition-colors cursor-col-resize ${props.className || ''}`}
  />
)

export const VPanelResizeHandle = (props) => (
  <PanelResizeHandle
    {...props}
    className={`w-px ${props.className || ''}`}
  />
)

export const HPanelResizeHandle = (props) => (
  <PanelResizeHandle
    {...props}
    className={`h-px ${props.className || ''}`}
  />
)
