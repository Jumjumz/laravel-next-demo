import api from "@/lib/api";

interface LmsCourses {
  _id: number;
  courseName: string;
  courseType: string;
}

async function getAxiosPost(): Promise<LmsCourses[] | undefined> {
  try {
    const response = await api.get("/lmscourse");
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
        <ul className=" text-white font-mono text-xl">
          {lmscourse?.map((course: LmsCourses) => (
            <li key={course._id} className="mb-6">
              <h2>{course.courseName}</h2>
              <h4>{course.courseType}</h4>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}