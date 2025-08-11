import { Directories, columns } from "./columns";
import { DataTable } from "./data-table";
import { Breadcrumb, BreadcrumbItems } from "@/components/breadcrumb";
import { promises as fs } from "fs";
import path from 'path';
import { isImageFile } from "@/lib/utils";
import { notFound } from "next/navigation";
import dynamic from 'next/dynamic';

const Gallery = dynamic(() => import('@/components/gallery').then(mod => ({ default: mod.Gallery })), {
  loading: () => <div className="flex items-center justify-center p-8 text-muted-foreground">Loading gallery...</div>,
  ssr: false
});


function getBreadcrumbItems(folderArray: Array<string>): Array<BreadcrumbItems> {
  return folderArray
    .map((item, idx, arr) => {
      if (idx + 1 < arr.length) {
        // This is not the last iteration
        return {
          href: "/folder/" + arr.slice(0, idx + 1).join("/"),
          label: item,
        }}
      else {
        return {
          label: item
        }
      }
    })
}

function buildFinalTableData(tableData: Array<Directories>, pathArray: Array<string>) : Array<Directories> {
  const previousPath = pathArray.slice(0, -1);
  const href = 
    previousPath.length > 0
    ? "/folder/" + previousPath.join("/")
    : "/"

  return [
    {
      id: "..",
      name: "..",
      path: "",
      href: href,
      relativePath: "/storage",
      isDirectory: true
    }
  ].concat(tableData);
}

export default async function Home({ pathArray = [] }: { pathArray: Array<string> }) {
  const mainDir = path.join(process.cwd(), "public", "storage", pathArray.join("/"));
  let filenames: Array<string>;
  
  try {
    filenames = await fs.readdir(mainDir);
  }
  catch (error) {
    console.log(error);
    notFound()
  }
  

  const files = [];
  for (const filename of filenames) {
    const fullPath = path.join(mainDir, filename);
    const fileStat = await fs.lstat(fullPath);
    
    files.push({
      id: filename,
      name: filename,
      path: fullPath,
      href: path.join("/folder/" + pathArray.join("/"), filename),
      relativePath: path.join("/storage", pathArray.join("/")),
      isDirectory: fileStat.isDirectory()
    });
  }

  const tableData = files.filter((file) => file.isDirectory);
  const finalTableData = 
    pathArray.length > 0
    ? buildFinalTableData(tableData, pathArray)
    : tableData;

  const images = files.filter((file) => 
    !file.isDirectory && isImageFile(file.name))

  return (
    <div className="overflow-auto max-h-dvh w-full">
      <div className="container flex flex-col items-start gap-8 pt-8 pb-16 max-w-screen-2xl">
        <Breadcrumb items={getBreadcrumbItems(pathArray)} />
        <DataTable columns={columns} data={finalTableData} />
        <Gallery images={images} />
      </div>
    </div>
  );
}
