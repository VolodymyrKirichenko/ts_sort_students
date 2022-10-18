
export interface Student {
  name: string;
  surname: string;
  age: number;
  married: boolean;
  grades: number[];
}

export enum SortType {
  Name = 'name',
  Surname = 'surname',
  Age = 'age',
  Married = 'married',
  AverageGrade = 'grades',
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

function averageScore(students: Student): number {
  return students.grades.reduce(
    (acc: number, current: number) => acc + current, 0,
  ) / students.grades.length;
}

export function sortStudents(
  students: Student[],
  sortBy: SortType,
  order: SortOrder,
): Student[] {
  const isAsc: boolean = order === SortOrder.Asc;
  const array = [...students];

  switch (sortBy) {
    case SortType.Name:
    case SortType.Surname:
      array.sort((studentOne, studentTwo) => {
        return isAsc
          ? studentOne[sortBy].localeCompare(studentTwo[sortBy])
          : studentTwo[sortBy].localeCompare(studentOne[sortBy]);
      });
      break;

    case SortType.Age:
      array.sort((studentOne, studentTwo) => {
        return isAsc
          ? studentOne.age - studentTwo.age
          : studentTwo.age - studentOne.age;
      });
      break;

    case SortType.Married:
      array.sort((studentOne, studentTwo) => {
        return isAsc
          ? Number(studentOne.married) - Number(studentTwo.married)
          : Number(studentTwo.married) - Number(studentOne.married);
      });
      break;

    case SortType.AverageGrade:
      array.sort((studentOne, studentTwo) => {
        return isAsc
          ? averageScore(studentOne) - averageScore(studentTwo)
          : averageScore(studentTwo) - averageScore(studentOne);
      });
      break;

    default:
      throw new Error('there is no mistake');
  }

  return array;
}
