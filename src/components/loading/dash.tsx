interface LoadingDashProps {
  classes?: string;
}
export default function LoadingDash({ classes = "" }: LoadingDashProps) {
  return (
    <div
      className={"h-1 leading-none bg-default/20 animate-pulse " + classes}
    ></div>
  );
}
