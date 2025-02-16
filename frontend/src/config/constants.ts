export enum DateFormat {
  Exact = "MMMM Do YYYY, h:mm:ss a",
  Euro = "DD-MM-YYYY",
}

export const uploadLimit = 10;

export enum QueryStringParams {}

export const defaultPagination = {
  pageSize: 10,
  firstPage: 1,
  pageSizes: [10, 25, 50, 100],
};

export const defaultAutocompleteSize = 50;
