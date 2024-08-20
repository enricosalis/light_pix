import Home from "@/app/page";
 
export default function FolderHome({ params }: { params: { folderName: Array<string> }}) {
  return (
    <Home pathArray={params.folderName} />
  );
}
