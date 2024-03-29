import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentType } from 'src/app/models/transaction/payment';
import { TransactionType } from 'src/app/models/transaction/transaction_type';
import { Transactions } from 'src/app/models/transaction/transactions';
import { Address } from 'src/app/models/user_address';
import { PdfExportService } from 'src/app/services/review-transaction/pdf-export-service.service';

@Component({
  selector: 'app-review-transaction',
  templateUrl: './review-transaction.component.html',
  styleUrls: ['./review-transaction.component.css'],
})
export class ReviewTransactionComponent implements OnInit {
  _transaction: Transactions | null = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    public location: Location,
    private pdfExportService: PdfExportService
  ) {}
  paymentDate: string = '';
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      const transactions = params['transaction'];

      const transaction: Transactions = JSON.parse(transactions);
      this._transaction = transaction;

      console.log('Transaction:', transaction);
    });
  }
  isGcash(type: PaymentType): boolean {
    if (type == PaymentType.GCASH) {
      return true;
    }
    return false;
  }
  isDelivery(type: TransactionType): boolean {
    if (type == TransactionType.DELIVERY) {
      return true;
    }
    return false;
  }

  displayAddress(address: Address | null) {
    if (address === null) {
      return '';
    }
    return `${address.landmark}, ${address.barangay}, ${address.city}, ${address?.province}, ${address?.region} | ${address?.postalCode}`;
  }

  downloadPdf(): void {
    if (this._transaction) {
      this.pdfExportService.exportTransactionAsPdf(this._transaction);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
