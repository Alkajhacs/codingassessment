import { EntityBase } from "./EntityBase/EntityBase";
import {
  Column,
  Entity,
  Unique,
  JoinColumn,
  ManyToOne
} from "typeorm";
import { Problem } from "./problem";

@Entity("testcases")
@Unique(["id"])
export class Testcase extends EntityBase {

  @Column({name: "Problem_id", nullable: true})
  Problem_id: number;

  @Column({ name: "Expected_Input", nullable: false })
  Expected_Input: string;

  @Column({ name: "Expected_Output", nullable: false })
  Expected_Output: string;

  @ManyToOne(
    (type) => Problem,
    (problems) => problems.testcases,
  )
  @JoinColumn({name: "Problem_id"})
  problems: Problem;
}
