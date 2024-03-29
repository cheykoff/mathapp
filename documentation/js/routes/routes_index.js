var ROUTES_INDEX = {
  name: "<root>",
  kind: "module",
  className: "AppModule",
  children: [
    {
      name: "routes",
      filename: "src/app/app-routing.module.ts",
      module: "AppRoutingModule",
      children: [
        { path: "", redirectTo: "/startpage", pathMatch: "full" },
        { path: "loadingpage", component: "LoadingpageComponent" },
        { path: "startpage", component: "StartpageComponent" },
        { path: "classselection", component: "ClassselectionComponent" },
        { path: "codepage", component: "CodepageComponent" },
        { path: "exercise", component: "ExerciseComponent" },
        { path: "resultpage", component: "ResultpageComponent" },
        { path: "puzzle", component: "PuzzleComponent" },
        { path: "puzzleresultpage", component: "PuzzleresultpageComponent" },
        { path: "**", redirectTo: "/startpage" },
      ],
      kind: "module",
    },
  ],
};
