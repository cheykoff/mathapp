"use strict";

customElements.define(
  "compodoc-menu",
  class extends HTMLElement {
    constructor() {
      super();
      this.isNormalMode = this.getAttribute("mode") === "normal";
    }

    connectedCallback() {
      this.render(this.isNormalMode);
    }

    render(isNormalMode) {
      let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">quizappv1 documentation</a>
                </li>

                <li class="divider"></li>
                ${
                  isNormalMode
                    ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>`
                    : ""
                }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${
                              isNormalMode
                                ? 'data-target="#modules-links"'
                                : 'data-target="#xs-modules-links"'
                            }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${
                          isNormalMode
                            ? 'id="modules-links"'
                            : 'id="xs-modules-links"'
                        }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-target="#components-links-module-AppModule-3c5f9ea63496022f5e036286907183b3db61ac961fc4fc6393cd13ef224d57b1126fb497956be29f5499689a7f486b589701e12d4a8d08dfdf7f72e71fcbf34a"'
                                            : 'data-target="#xs-components-links-module-AppModule-3c5f9ea63496022f5e036286907183b3db61ac961fc4fc6393cd13ef224d57b1126fb497956be29f5499689a7f486b589701e12d4a8d08dfdf7f72e71fcbf34a"'
                                        }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="components-links-module-AppModule-3c5f9ea63496022f5e036286907183b3db61ac961fc4fc6393cd13ef224d57b1126fb497956be29f5499689a7f486b589701e12d4a8d08dfdf7f72e71fcbf34a"'
                                            : 'id="xs-components-links-module-AppModule-3c5f9ea63496022f5e036286907183b3db61ac961fc4fc6393cd13ef224d57b1126fb497956be29f5499689a7f486b589701e12d4a8d08dfdf7f72e71fcbf34a"'
                                        }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ClassselectionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClassselectionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CodepageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CodepageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ExerciseComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExerciseComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoadingpageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoadingpageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PuzzleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PuzzleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PuzzleresultpageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PuzzleresultpageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResultpageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResultpageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StartpageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StartpageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-target="#directives-links-module-AppModule-3c5f9ea63496022f5e036286907183b3db61ac961fc4fc6393cd13ef224d57b1126fb497956be29f5499689a7f486b589701e12d4a8d08dfdf7f72e71fcbf34a"'
                                        : 'data-target="#xs-directives-links-module-AppModule-3c5f9ea63496022f5e036286907183b3db61ac961fc4fc6393cd13ef224d57b1126fb497956be29f5499689a7f486b589701e12d4a8d08dfdf7f72e71fcbf34a"'
                                    }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="directives-links-module-AppModule-3c5f9ea63496022f5e036286907183b3db61ac961fc4fc6393cd13ef224d57b1126fb497956be29f5499689a7f486b589701e12d4a8d08dfdf7f72e71fcbf34a"'
                                        : 'id="xs-directives-links-module-AppModule-3c5f9ea63496022f5e036286907183b3db61ac961fc4fc6393cd13ef224d57b1126fb497956be29f5499689a7f486b589701e12d4a8d08dfdf7f72e71fcbf34a"'
                                    }>
                                        <li class="link">
                                            <a href="directives/ChangeBgDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChangeBgDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-target="#pipes-links-module-AppModule-3c5f9ea63496022f5e036286907183b3db61ac961fc4fc6393cd13ef224d57b1126fb497956be29f5499689a7f486b589701e12d4a8d08dfdf7f72e71fcbf34a"'
                                            : 'data-target="#xs-pipes-links-module-AppModule-3c5f9ea63496022f5e036286907183b3db61ac961fc4fc6393cd13ef224d57b1126fb497956be29f5499689a7f486b589701e12d4a8d08dfdf7f72e71fcbf34a"'
                                        }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="pipes-links-module-AppModule-3c5f9ea63496022f5e036286907183b3db61ac961fc4fc6393cd13ef224d57b1126fb497956be29f5499689a7f486b589701e12d4a8d08dfdf7f72e71fcbf34a"'
                                            : 'id="xs-pipes-links-module-AppModule-3c5f9ea63496022f5e036286907183b3db61ac961fc4fc6393cd13ef224d57b1126fb497956be29f5499689a7f486b589701e12d4a8d08dfdf7f72e71fcbf34a"'
                                        }>
                                            <li class="link">
                                                <a href="pipes/CountDownPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CountDownPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${
                              isNormalMode
                                ? 'data-target="#injectables-links"'
                                : 'data-target="#xs-injectables-links"'
                            }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${
                              isNormalMode
                                ? 'id="injectables-links"'
                                : 'id="xs-injectables-links"'
                            }>
                                <li class="link">
                                    <a href="injectables/DataService.html" data-type="entity-link" >DataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SharedService.html" data-type="entity-link" >SharedService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${
                          isNormalMode
                            ? 'data-target="#interfaces-links"'
                            : 'data-target="#xs-interfaces-links"'
                        }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${
                          isNormalMode
                            ? ' id="interfaces-links"'
                            : 'id="xs-interfaces-links"'
                        }>
                            <li class="link">
                                <a href="interfaces/Exercise.html" data-type="entity-link" >Exercise</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Puzzle.html" data-type="entity-link" >Puzzle</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SchoolClass.html" data-type="entity-link" >SchoolClass</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${
                          isNormalMode
                            ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"'
                        }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${
                          isNormalMode
                            ? 'id="miscellaneous-links"'
                            : 'id="xs-miscellaneous-links"'
                        }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
      this.innerHTML = tp.strings;
    }
  }
);
