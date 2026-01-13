export default async function CoursesPage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const { page = "1", sort = "asc", query = "" } = await searchParams;

	return (
		<div>
			<h1>Cursos Listing</h1>
			<p>Search query: {query}</p>
			<p>Current page: {page}</p>
			<p>Sort order: {sort}</p>
		</div>
	);
}
