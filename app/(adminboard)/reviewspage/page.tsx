'use client';

import React, { useState, useEffect } from 'react';
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  ChevronDownIcon,
} from "@radix-ui/react-icons" 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}
 

interface Submission {
  id: string;
  name: string;
  email: string;
  resume: string;
  portfolio: string;
}

interface Review {
  submissionId: string;
  status: string;
  feedback: string;
}

export const columns: ColumnDef<Submission>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "resume",
    header: "Resume",
    cell: ({ row }) => {
      const resume = row.getValue("resume") as string;
      return (
        <a href={resume} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
          View Resume
        </a>
      );
    },
  },
  {
    accessorKey: "portfolio",
    header: "Portfolio",
    cell: ({ row }) => {
      const portfolio = row.getValue("portfolio") as string;
      return (
        <a href={portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
          View Portfolio
        </a>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const submissionId = row.original.id;

      if (status === "pending") {
        return (
          <a
            href={`/feedback/${submissionId}`}
            className="text-yellow-600 underline"
          >
            pending
          </a>
        );
      }
      return <div className='text-green-600'>{status}</div>;
    }
  },
  {
    accessorKey: "feedback",
    header: "Feedback",
    cell: ({ row }) => <div>{row.getValue("feedback")}</div>,
  },
]



const SubmissionsPage = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: submissions,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
  })

  useEffect(() => {
    const fetchSubmissionsAndReviews = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/submissions`);
        if (!response.ok) {
          throw new Error('Failed to fetch submissions');
        }
        const submissionsData = await response.json();
  
        const updatedSubmissions = await Promise.all(
          submissionsData.map(async (submission: Submission) => {
            const review = await fetchReview(submission.id); 
            return {
              ...submission,
              status: review?.status || "pending",
              feedback: review?.feedback || "",
            };
          })
        );

        const rearrangedSubmissions = [
          ...updatedSubmissions.filter(sub => sub.status === "pending"),
          ...updatedSubmissions.filter(sub => sub.status === "reviewed"),
      ];
  
        setSubmissions(rearrangedSubmissions);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchSubmissionsAndReviews();
  }, []);

  const fetchReview = async (submissionId: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reviews/${submissionId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch review');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching review:', error);
      return { status: 'pending', feedback: '' };
    }
  };

   
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">User  Submissions</h2>

            {loading && <div>Loading...</div>}
            
            {error && <div className="text-red-600">{error}</div>}

            <div className="w-full">
            <div className="flex items-center py-4">
              <Input
                placeholder="Filter by ID..."
                value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                  table.getColumn("id")?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      )
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        )
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                {table.getRowModel().rows?.length > 0 ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
              <div className="flex-1 text-sm text-muted-foreground">
                {table.getRowModel().rows.length} row(s)
              </div>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
            </div>
      </div>
    </div>
  );
}
export default SubmissionsPage;
