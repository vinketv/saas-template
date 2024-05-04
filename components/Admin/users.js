import { ToggleButton } from "@/components/Admin/toggle";
import { prisma } from "@/lib/prisma";

export default async function User() {
  const users = await prisma.user.findMany();
  return (
    <tbody>
      {users.map((item, id) => (
        <tr
          key={id}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <th
            scope="row"
            className="sm:flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
          >
            <img
              className="w-10 h-10 sm:block hidden rounded-full"
              src={item.image}
              alt="Jese image"
            />
            <div className="ps-3">
              <div className="text-base font-semibold">{item.username}</div>
              <div className="hidden sm:block font-normal text-gray-500">
                {item.email}
              </div>
            </div>
          </th>
          <td className="px-6 py-4">
            <div className="flex items-center">
              {item.role === "banned" ? (
                <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>
              ) : (
                <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
              )}{" "}
              {item.role}
            </div>
          </td>
          <td className="hidden lg:table-cell px-6 py-4">
            {item.createdAt.toLocaleString()}
          </td>
          <td className="px-6 py-4">
            <ToggleButton user={item}></ToggleButton>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
