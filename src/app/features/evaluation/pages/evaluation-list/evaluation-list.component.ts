import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SidebarComponent } from '../../../../layout/dashboard-layout/compnents/sidebar/sidebar.component';
import { SharedPaginationComponent } from '../../../../@shared/shared-pagination/shared-pagination.component';
import { EvaluationService } from '../../services/evaluation.service';
import { PagingMetaData } from '../../../../@models/shared/paging-meta-data.model';
import { GetEvaluationListDto, GetEvaluationParamsDto } from '../../models/evaluation.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-evaluation-list',
  imports: [RouterLink, CommonModule, SidebarComponent, SharedPaginationComponent],
  templateUrl: './evaluation-list.component.html',
  styleUrl: './evaluation-list.component.scss'
})
export class EvaluationListComponent implements OnInit {
  isLoading: boolean = false;
  filter: any;

  searchModel = {} as GetEvaluationParamsDto;
  evaluationList = [] as GetEvaluationListDto[];
  pagingMetaData: PagingMetaData = {} as PagingMetaData;

  constructor(private evaluationService: EvaluationService) {

  }

  ngOnInit() {
    this.search();
  }

  search() {
    this.evaluationService.getAll(this.searchModel).subscribe((response) => {
      this.evaluationList = response.listItems as GetEvaluationListDto[];
      this.pagingMetaData = response.pagingMetaData;
    });
  }


  onPageChange(page: number) {
    if (page < 1 || page > this.pagingMetaData.pageCount) {
      return;
    }
    this.searchModel.PageNumber = page;
    this.search();
  }
}
