import { EntityBase } from "./EntityBase/EntityBase";
import {
  Column,
  Entity,
  Unique,
  OneToMany
} from "typeorm";
import { Testcase } from "./testcases";

@Entity("problem_entity")
@Unique(["id"])
export class Problem extends EntityBase {
  @Column({ name: "Problem_Name", nullable: true })
  Problem_Name: string;

  @Column({ name: "Problem", nullable: true })
  Problem: string;

  @Column({ name: "Input", nullable: true })
  Input: string;
  
  @Column({ name: "Output", nullable: true })
  Output: string;

  @Column({ name: "Constraints", nullable: true })
  Constraints: string;

  @Column({ name: "Example", nullable: true })
  Example: string;

  @Column({ name: "Duration", nullable: true })
  Duration: number;

  @Column({ name: "Marks", nullable: true })
  Marks: number;

  @OneToMany(
    (type) => Testcase,
    (testcases) => testcases.problems,
  )
  testcases: Testcase[];

}
