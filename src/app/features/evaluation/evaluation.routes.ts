import { Routes } from "@angular/router";
import { EvaluationListComponent } from "./pages/evaluation-list/evaluation-list.component";
import { AuthGuard } from "../../@core/guards/auth.guard";
import { Role } from "../../@core/enums/role.enum";
import { EvaluationDetailsComponent } from "./pages/evaluation-details/evaluation-details.component";
import { EvaluationQuestionsComponent } from "./pages/evaluation-questions/evaluation-questions.component";

const routes: Routes = [
    {
        path: "",
        children: [
            {
                path: 'evaluations',
                component: EvaluationListComponent,
                canActivate: [AuthGuard],
                data: {
                    expectedRoles: [Role.Admin]
                }
            },
            {
                path: 'evaluations-details/:id',
                component: EvaluationDetailsComponent,
                canActivate: [AuthGuard],
                data: {
                    expectedRoles: [Role.Admin]
                }
            },
            {
                path: 'evaluations-questions/:id',
                component: EvaluationQuestionsComponent,
                canActivate: [AuthGuard],
                data: {
                    expectedRoles: [Role.Admin]
                }
            }
        ],
    },
];

export default routes;