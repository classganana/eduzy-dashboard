export class Constants {
  public static readonly eduzyDashboardTitle = "Eduzy Dashboard";

  public static readonly routes = {
    tests: "/tests",
    createTest: "/tests/create-test",
    report: "/test/:assessmentId/report/:assessmentName",
    home: "/home",
    login: "/login",
  };

  public static readonly LocalStorageAccessTokenKey = "E_D_ACCESS_TOKEN";

  public static readonly assessmentStatusIcons = {};

  public static readonly sidebarNeededPages = [Constants.routes.tests];
}
