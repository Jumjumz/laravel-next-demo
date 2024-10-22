import api from "@/lib/api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface LmsCourses {
  _id: number;
  courseName: string;
  courseType: string;
  courseWeeksCompletion: number;
  coursePages: [];
}

async function getAxiosPost(): Promise<LmsCourses[] | undefined> {
  try {
    const response = await api.get("/lmscourse");
    console.log(response.headers);
    return response.data;
  } catch (err) {
    console.error("Fetch failed", err);
    return undefined;
  }
}

export default async function LmsCourses() {
  let lmscourse = await getAxiosPost();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Table className=" text-xl text-white font-mono w-[100rem]">
          <TableCaption>Course List</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Course Name</TableHead>
              <TableHead>Course Type</TableHead>
              <TableHead className=" text-right">Course Completion</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lmscourse?.map((course) => (
              <TableRow key={course._id}>
                <TableCell>{course.courseName}</TableCell>
                <TableCell>{course.courseType}</TableCell>
                <TableCell className=" text-right">
                  {course.courseWeeksCompletion}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  );
}
