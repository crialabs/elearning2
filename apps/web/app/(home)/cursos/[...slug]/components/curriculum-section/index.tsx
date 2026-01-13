"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@repo/design-system/components/ui/accordion";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@repo/design-system/components/ui/table";
import type { CurriculumComponentProps, Discipline } from "../../lib/types";

interface SemesterData {
	semester: number;
	disciplines: Discipline[];
}

export function CurriculumSection({
	title,
	description,
	disciplines,
	mode = "neutral",
}: CurriculumComponentProps) {
	// Group disciplines by semester
	const semesterGroups = disciplines.reduce(
		(acc, discipline, index) => {
			const semester = discipline.period ? 1 : 1 + Math.floor(index / 6);
			if (!acc[semester]) {
				acc[semester] = [];
			}
			acc[semester].push(discipline);
			return acc;
		},
		{} as Record<number, Discipline[]>,
	);

	const semesters: SemesterData[] = Object.entries(semesterGroups)
		.sort(([a], [b]) => Number(a) - Number(b))
		.map(([semester, dishes]) => ({
			semester: Number(semester),
			disciplines: dishes,
		}));

	const bgClassName = mode === "primary" ? "bg-secondary" : "bg-background";

	return (
		<section className={`w-full py-12 sm:py-20 ${bgClassName}`}>
			<div className="container mx-auto px-4">
				{/* Header */}
				<div className="mb-12">
					<h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
						{title}
					</h2>
					{description && (
						<p className="text-lg text-muted-foreground">{description}</p>
					)}
				</div>

				{/* Accordion */}
				<div className="max-w-4xl mx-auto">
					<Accordion type="single" collapsible className="w-full">
						{semesters.map((semester) => (
							<AccordionItem
								key={`semester-${semester.semester}`}
								value={`semester-${semester.semester}`}
								className="border-border"
							>
								<AccordionTrigger className="text-left hover:no-underline hover:bg-muted rounded px-4 py-3">
									<div className="flex items-center gap-3 w-full">
										<div className="h-10 w-10 rounded-full bg-primary flex shrink-0 items-center justify-center">
											<span className="text-primary-foreground font-bold text-sm">
												{semester.semester}º
											</span>
										</div>
										<span className="text-lg font-semibold text-foreground">
											{semester.semester}º Semestre
										</span>
										<span className="ml-auto text-sm text-muted-foreground">
											{semester.disciplines.length} disciplinas
										</span>
									</div>
								</AccordionTrigger>
								<AccordionContent className="px-0 py-4">
									<div className="overflow-x-auto">
										<Table>
											<TableHeader>
												<TableRow className="bg-muted">
													<TableHead className="font-semibold text-foreground">
														Disciplina
													</TableHead>
													<TableHead className="text-center font-semibold text-foreground hidden sm:table-cell">
														Horas
													</TableHead>
													<TableHead className="text-center font-semibold text-foreground hidden md:table-cell">
														Tipo
													</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												{semester.disciplines.map((discipline, index) => (
													<TableRow
														key={`${semester.semester}-${index}`}
														className="hover:bg-muted transition-colors"
													>
														<TableCell className="font-medium text-foreground py-4">
															<div>
																<p className="font-semibold">
																	{discipline.name}
																</p>
																{discipline.description && (
																	<p className="text-sm text-muted-foreground mt-1">
																		{discipline.description}
																	</p>
																)}
															</div>
														</TableCell>
														<TableCell className="text-center text-muted-foreground hidden sm:table-cell py-4">
															{discipline.hours ? `${discipline.hours}h` : "-"}
														</TableCell>
														<TableCell className="text-center text-muted-foreground hidden md:table-cell py-4">
															<span className="inline-block px-3 py-1 rounded-full bg-muted text-xs font-medium">
																{discipline.period === "obrigatória"
																	? "Obrigatória"
																	: "Eletiva"}
															</span>
														</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
									</div>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
		</section>
	);
}
