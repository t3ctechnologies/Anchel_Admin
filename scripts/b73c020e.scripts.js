"use strict";
angular.module("linshareAdminApp", ["ui.bootstrap", "ui.router", "ngLocale", "ngSanitize", "ngResource", "ngRoute", "ngCookies", "ui.select", "ngTable", "http-auth-interceptor", "chieffancypants.loadingBar", "pascalprecht.translate", "tmh.dynamicLocale", "restangular", "checklist-model", "toggle-switch", "lsDropdownApp", "angularMoment", "luegg.directives", "graphApp", "pasvaz.bindonce"]).config(["$provide", "$logProvider", "$translateProvider", "$translatePartialLoaderProvider", "RestangularProvider", "uiSelectConfig", "cfpLoadingBarProvider", "tmhDynamicLocaleProvider", "lsAppConfig", function($provide, $logProvider, $translateProvider, $translatePartialLoaderProvider, RestangularProvider, uiSelectConfig, cfpLoadingBarProvider, tmhDynamicLocaleProvider, lsAppConfig) {
        var debug = document.cookie.linshareDebug || lsAppConfig.debug;
        $logProvider.debugEnabled(debug), $translateProvider.useLoader("$translatePartialLoader", {
            urlTemplate: "i18n/{part}-{lang}.json"
        }), $translatePartialLoaderProvider.addPart("locale"), $translateProvider.preferredLanguage("en"), $translateProvider.addInterpolation("$translateMessageFormatInterpolation"), debug && $translateProvider.useMissingTranslationHandlerLog(), $translateProvider.useCookieStorage(), tmhDynamicLocaleProvider.localeLocationPattern("i18n/angular/angular-locale_{{locale}}.js"), RestangularProvider.setBaseUrl(lsAppConfig.backendURL), RestangularProvider.setDefaultHeaders({
            "Content-Type": "application/json"
        }), RestangularProvider.addResponseInterceptor(function(data, operation) {
            if ("head" === operation) return !0;
            var newResponse = data;
            return angular.isArray(data) ? angular.forEach(newResponse, function(value, key) {
                angular.isObject(value) ? newResponse[key].originalElement = angular.copy(value) : (newResponse.originalElement = [], newResponse.originalElement[key] = angular.copy(value))
            }) : angular.isObject(data) && (newResponse.originalElement = angular.copy(data)), newResponse
        }), RestangularProvider.addFullRequestInterceptor(function(element, operation, route, url, headers) {
            return headers["WWW-No-Authenticate"] = "linshare", element && delete element.originalElement, element
        }), uiSelectConfig.theme = "bootstrap", cfpLoadingBarProvider.includeSpinner = !1, $provide.decorator("$state", ["$delegate", "$rootScope", function($delegate, $rootScope) {
            return $delegate.reinit = function() {
                this.go(".", {}, {
                    reload: !0
                })
            }, $rootScope.$on("$stateChangeStart", function(event, state, params) {
                $delegate.next = state, $delegate.toParams = params
            }), $delegate
        }])
    }]).run(["$rootScope", "$state", "$log", "Restangular", "Notification", "lsAppConfig", function($rootScope, $state, $log, Restangular, Notification, lsAppConfig) {
        Restangular.setErrorInterceptor(function(response, deferred) {
            return "HEAD" === response.config.method && 404 === response.status ? (deferred.resolve(!1), !1) : ($log.error(response), 401 !== response.status && response.status < 500 && Notification.addError(response.data), response.status >= 500 && response.status < 600 && Notification.addError(response), !0)
        }), lsAppConfig.debug && ($rootScope.$on("$stateChangeStart", function(event, toState, toParams) {
            $log.debug("$stateChangeStart to " + toState.to + "- fired when the transition begins. toState,toParams : \n", toState, toParams)
        }), $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams) {
            $log.debug("$stateChangeError - fired when an error occurs during transition."), $log.debug([event, toState, toParams, fromState, fromParams].join("\n")), $log.debug(arguments)
        }), $rootScope.$on("$stateChangeSuccess", function(event, toState) {
            $log.debug("$stateChangeSuccess to " + toState.name + "- fired once the state transition is complete.")
        }), $rootScope.$on("$viewContentLoaded", function(event) {
            $log.debug("$viewContentLoaded - fired after dom rendered", event)
        }), $rootScope.$on("$stateNotFound", function(event, unfoundState, fromState, fromParams) {
            $log.debug("$stateNotFound " + unfoundState.to + "  - fired when a state cannot be found by its name."), $log.debug(unfoundState, fromState, fromParams)
        })), $rootScope.routerState = $state
    }]),
    function() {
        angular.module("linshareAdminApp").constant("_", _).constant("Base64", Base64)
    }(), angular.module("linshareAdminApp").config(["_", "$stateProvider", "$urlRouterProvider", function(_, $stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/dashboard");
        var funcAccountExpiration = function(currentUser, Functionality) {
            return currentUser ? Functionality.get(currentUser.domain, "GUESTS__EXPIRATION") : void 0
        };
        funcAccountExpiration.$inject = ["currentUser", "Functionality"];
        var funcRestrictedGuest = function(currentUser, Functionality) {
            return currentUser ? Functionality.get(currentUser.domain, "GUESTS__RESTRICTED") : void 0
        };
        funcRestrictedGuest.$inject = ["currentUser", "Functionality"];
        var enumRole = function(Enum) {
            return Enum.getOptions("role")
        };
        enumRole.$inject = ["Enum"];
        var enumLanguage = function(Enum) {
            return Enum.getOptions("supported_language")
        };
        enumLanguage.$inject = ["Enum"];
        var enumMailLanguage = function(Enum) {
            return Enum.getOptions("language")
        };
        enumMailLanguage.$inject = ["Enum"];
        var enumLogAction = function(Enum) {
            return Enum.getOptions("log_action_v1")
        };
        enumLogAction.$inject = ["Enum"];
        var enumDomainAccessRuleTypes = function(Enum) {
            return Enum.getOptions("domain_access_rule_type")
        };
        enumDomainAccessRuleTypes.$inject = ["Enum"];
        var enumUploadPropositionFieldTypes = function(Enum) {
            return Enum.getOptions("upload_proposition_rule_field_type")
        };
        enumUploadPropositionFieldTypes.$inject = ["Enum"];
        var enumUploadPropositionOperatorTypes = function(Enum) {
            return Enum.getOptions("upload_proposition_rule_operator_type")
        };
        enumUploadPropositionOperatorTypes.$inject = ["Enum"];
        var enumUploadPropositionActionTypes = function(Enum) {
            return Enum.getOptions("upload_proposition_action_type")
        };
        enumUploadPropositionActionTypes.$inject = ["Enum"];
        var enumUploadPropositionMatchTypes = function(Enum) {
            return Enum.getOptions("upload_proposition_match_type")
        };
        enumUploadPropositionMatchTypes.$inject = ["Enum"];
        var enumTechnicalAccountPermissionTypes = function(Enum) {
            return Enum.getOptions("technical_account_permission_type")
        };
        enumTechnicalAccountPermissionTypes.$inject = ["Enum"];
        var enumUploadRequestStatus = function(Enum) {
            return Enum.getOptions("upload_request_status")
        };
        enumUploadRequestStatus.$inject = ["Enum"];
        var authenticatedUser = function(Authentication) {
            return Authentication.getCurrentUser()
        };
        authenticatedUser.$inject = ["Authentication"];
        var domainTreeView = {
                templateUrl: "ng_components/domain/domain_tree.tpl.html",
                controller: "DomainTreeCtrl",
                resolve: {
                    rootDomain: function(Domain, authenticatedUser) {
                        return Domain.getDomainTree(authenticatedUser.domain)
                    }
                }
            },
            domainQuotaTreeView = {
                templateUrl: "ng_components/quota/quota_tree.tpl.html",
                controller: "DomainQuotaTreeController",
                resolve: {
                    rootDomain: function(Domain, authenticatedUser) {
                        return Domain.getDomainTree(authenticatedUser.domain)
                    },
                    domainsQuota: function($window, quotaRestService) {
                        return quotaRestService.getListDomain()
                    }
                }
            },
            userMaxExpiryDate = function(_funcAccountExpiration) {
                var date = new Date,
                    delta = _funcAccountExpiration.parameters[0].integer;
                return "DAY" === _funcAccountExpiration.parameters.string ? date.setDay(date.getDay() + delta) : "WEEK" === _funcAccountExpiration.parameters.string ? date.setWeek(date.getWeek() + delta) : date.setMonth(date.getMonth() + delta), date
            };
        userMaxExpiryDate.$inject = ["_funcAccountExpiration"];
        var userRestrictedGuestStatus = function(_funcRestrictedGuest) {
            return "ALLOWED" !== _funcRestrictedGuest.activationPolicy.policy
        };
        userRestrictedGuestStatus.$inject = ["_funcRestrictedGuest"];
        var userSelectOptions = function(_enumRole, _enumLanguage, _enumMailLanguage) {
            return {
                userRoles: _.remove(_enumRole, function(role) {
                    return "SYSTEM" !== role && "SUPERADMIN" !== role && "DELEGATION" !== role && "UPLOAD_PROPOSITION" !== role
                }),
                selectEnumLanguage: _enumLanguage,
                selectMailLanguage: _enumMailLanguage
            }
        };
        userSelectOptions.$inject = ["_enumRole", "_enumLanguage", "_enumMailLanguage"], $stateProvider.state("dashboard", {
            url: "/dashboard",
            templateUrl: "ng_components/dashboard/index.tpl.html",
            controller: "DashbordCtrl",
            resolve: {
                authenticatedUser: authenticatedUser
            }
        }).state("functionality", {
            "abstract": !0,
            url: "/functionality",
            templateUrl: "ng_components/functionality/functionality.html",
            resolve: {
                treeTitle: function() {
                    return "COMMON.TAB.FUNCTIONALITIES"
                },
                treeType: function() {
                    return "read"
                },
                authenticatedUser: authenticatedUser
            },
            controller: ["$scope", "$state", function($scope, $state) {
                $scope.$state = $state
            }]
        }).state("functionality.list", {
            url: "/:domainId/list?view",
            views: {
                tree: domainTreeView,
                list: {
                    templateUrl: "ng_components/functionality/functionality_list.tpl.html",
                    controller: "FunctionalityListCtrl",
                    resolve: {
                        currentDomain: ["Domain", "$stateParams", function(Domain, $stateParams) {
                            return Domain.get($stateParams.domainId)
                        }],
                        functionalities: ["Functionality", "currentDomain", function(Functionality, currentDomain) {
                            return Functionality.getAll(currentDomain.identifier, null)
                        }]
                    }
                }
            }
        }).state("functionality.detail", {
            url: "/:domainId/detail/:id?view&f",
            views: {
                tree: domainTreeView,
                detail: {
                    templateUrl: "ng_components/functionality/functionality_detail.tpl.html",
                    controller: "FunctionalityDetailCtrl",
                    resolve: {
                        currentFunctionality: ["Functionality", "$stateParams", function(Functionality, $stateParams) {
                            return Functionality.get($stateParams.domainId, $stateParams.id).then(function(functionalities) {
                                return functionalities
                            })
                        }],
                        childrenFunctionality: ["Functionality", "$stateParams", function(Functionality, $stateParams) {
                            return Functionality.getAll($stateParams.domainId, $stateParams.id).then(function(functionalities) {
                                return functionalities
                            })
                        }],
                        listFunctionalities: ["Functionality", "$stateParams", function(Functionality, $stateParams) {
                            return Functionality.getAll($stateParams.domainId, null).then(function(functionalities) {
                                return _.pluck(functionalities, "identifier")
                            })
                        }]
                    }
                }
            }
        }).state("mailactivation", {
            "abstract": !0,
            url: "/mailactivation",
            templateUrl: "ng_components/mailactivation/mailactivation.html",
            resolve: {
                treeTitle: function() {
                    return "COMMON.TAB.MAIL_ACTIVATION"
                },
                treeType: function() {
                    return "read"
                },
                authenticatedUser: authenticatedUser
            },
            controller: ["$scope", "$state", function($scope, $state) {
                $scope.$state = $state
            }]
        }).state("mailactivation.list", {
            url: "/:domainId/list?view",
            views: {
                tree: domainTreeView,
                list: {
                    templateUrl: "ng_components/mailactivation/mailactivation_list.tpl.html",
                    controller: "MailActivationListCtrl",
                    resolve: {
                        currentDomain: ["Domain", "$stateParams", function(Domain, $stateParams) {
                            return Domain.get($stateParams.domainId)
                        }],
                        mailActivations: ["MailActivation", "currentDomain", function(MailActivation, currentDomain) {
                            return MailActivation.getAll(currentDomain.identifier, null)
                        }]
                    }
                }
            }
        }).state("mailactivation.detail", {
            url: "/:domainId/detail/:id?view&f",
            views: {
                tree: domainTreeView,
                detail: {
                    templateUrl: "ng_components/mailactivation/mailactivation_detail.tpl.html",
                    controller: "MailActivationDetailCtrl",
                    resolve: {
                        currentMailActivation: ["MailActivation", "$stateParams", function(MailActivation, $stateParams) {
                            return MailActivation.get($stateParams.domainId, $stateParams.id).then(function(mailActivations) {
                                return mailActivations
                            })
                        }],
                        listMailActivation: ["MailActivation", "$stateParams", function(MailActivation, $stateParams) {
                            return MailActivation.getAll($stateParams.domainId, null).then(function(mailActivation) {
                                return _.pluck(mailActivation, "identifier")
                            })
                        }]
                    }
                }
            }
        }).state("mimepolicy", {
            "abstract": !0,
            url: "/mimepolicy",
            templateUrl: "ng_components/mimepolicy/mimepolicy.html",
            resolve: {
                treeTitle: function() {
                    return "COMMON.TAB.MIME_POLICIES"
                },
                treeType: function() {
                    return "read"
                },
                authenticatedUser: authenticatedUser
            },
            controller: ["$scope", "$state", function($scope, $state) {
                $scope.$state = $state
            }]
        }).state("mimepolicy.list", {
            url: "/:domainId/list",
            views: {
                tree: domainTreeView,
                list: {
                    templateUrl: "ng_components/mimepolicy/mimepolicy_list.tpl.html",
                    controller: "MimePolicyListCtrl",
                    resolve: {
                        currentDomain: ["Domain", "$stateParams", function(Domain, $stateParams) {
                            return Domain.get($stateParams.domainId)
                        }],
                        mimePolicies: ["MimePolicy", "currentDomain", function(MimePolicy, currentDomain) {
                            return MimePolicy.getAll(currentDomain.identifier, !0)
                        }]
                    }
                }
            }
        }).state("mimepolicy.detail", {
            url: "/:domainId/detail/:id",
            views: {
                detail: {
                    templateUrl: "ng_components/mimepolicy/mimepolicy_detail.tpl.html",
                    controller: "MimePolicyDetailCtrl",
                    resolve: {
                        currentDomain: ["Domain", "$stateParams", function(Domain, $stateParams) {
                            return Domain.get($stateParams.domainId)
                        }],
                        currentMimePolicy: ["$stateParams", "MimePolicy", function($stateParams, MimePolicy) {
                            return MimePolicy.get($stateParams.id, !0)
                        }]
                    }
                }
            }
        }).state("welcomemessage", {
            "abstract": !0,
            url: "/welcomemessage",
            templateUrl: "ng_components/welcomemessage/welcomemessage.html",
            resolve: {
                treeTitle: function() {
                    return "COMMON.TAB.WELCOME_MESSAGES"
                },
                treeType: function() {
                    return "read"
                },
                authenticatedUser: authenticatedUser
            },
            controller: ["$scope", "$state", function($scope, $state) {
                $scope.$state = $state
            }]
        }).state("welcomemessage.list", {
            url: "/:domainId/list",
            views: {
                tree: {
                    templateUrl: "ng_components/domain/domain_tree.tpl.html",
                    controller: "DomainTreeCtrl",
                    resolve: {
                        currentDomain: ["Domain", "$stateParams", function(Domain, $stateParams) {
                            return Domain.get($stateParams.domainId)
                        }],
                        rootDomain: ["Domain", "authenticatedUser", function(Domain, authenticatedUser) {
                            return Domain.getDomainTree(authenticatedUser.domain, !0)
                        }]
                    }
                },
                list: {
                    templateUrl: "ng_components/welcomemessage/welcomemessage_list.tpl.html",
                    controller: "WelcomeMessageListCtrl",
                    resolve: {
                        currentDomain: ["Domain", "$stateParams", function(Domain, $stateParams) {
                            return Domain.get($stateParams.domainId)
                        }],
                        welcomesMessages: ["WelcomeMessage", "$stateParams", function(WelcomeMessage, $stateParams) {
                            return WelcomeMessage.getAll($stateParams.domainId)
                        }],
                        rootDomain: ["Domain", "authenticatedUser", function(Domain, authenticatedUser) {
                            return Domain.getDomainTree(authenticatedUser.domain)
                        }],
                        authenticatedUser: authenticatedUser
                    }
                }
            }
        }).state("welcomemessage.detail", {
            url: "/:id?state",
            views: {
                detail: {
                    templateUrl: "ng_components/welcomemessage/welcomemessage_detail.tpl.html",
                    controller: "WelcomeMessageDetailCtrl",
                    resolve: {
                        currentDomain: ["Domain", "$stateParams", function(Domain, $stateParams) {
                            return Domain.get($stateParams.domainId)
                        }],
                        currentWelcomesMessage: ["WelcomeMessage", "$stateParams", function(WelcomeMessage, $stateParams) {
                            return $stateParams.id ? WelcomeMessage.get($stateParams.id) : void 0
                        }],
                        rootDomain: ["Domain", "authenticatedUser", function(Domain, authenticatedUser) {
                            return Domain.getDomainTree(authenticatedUser.domain)
                        }],
                        authenticatedUser: authenticatedUser
                    }
                }
            }
        }).state("user", {
            "abstract": !0,
            url: "/user",
            templateUrl: "ng_components/user/user.html"
        }).state("user.list", {
            url: "/list",
            templateUrl: "ng_components/user/user_list.tpl.html",
            controller: "UserListCtrl",
            resolve: {
                authenticatedUser: authenticatedUser
            }
        }).state("user.detail", {
            url: "/:uuid",
            resolve: {
                currentUser: ["User", "$stateParams", function(User, $stateParams) {
                    return User.get($stateParams.uuid)
                }],
                maxExpiryDate: userMaxExpiryDate,
                restrictedGuestStatus: userRestrictedGuestStatus,
                selectOptions: userSelectOptions,
                _funcAccountExpiration: funcAccountExpiration,
                _funcRestrictedGuest: funcRestrictedGuest,
                _enumRole: enumRole,
                _enumLanguage: enumLanguage,
                _enumMailLanguage: enumMailLanguage
            },
            templateUrl: "ng_components/user/user_detail.tpl.html",
            controller: "UserDetailCtrl"
        }).state("inconsistentuser", {
            "abstract": !0,
            url: "/inconsistentuser",
            templateUrl: "ng_components/inconsistentuser/inconsistentuser.html"
        }).state("inconsistentuser.search", {
            url: "/search",
            templateUrl: "ng_components/inconsistentuser/inconsistentuser_search.tpl.html",
            controller: "InconsistentUserSearchListCtrl"
        }).state("inconsistentuser.search.detail", {
            url: "/:uuid",
            templateUrl: "ng_components/user/user_detail.tpl.html",
            controller: "UserDetailCtrl",
            resolve: {
                currentUser: ["User", "$stateParams", function(User, $stateParams) {
                    return User.get($stateParams.uuid)
                }],
                maxExpiryDate: userMaxExpiryDate,
                restrictedGuestStatus: userRestrictedGuestStatus,
                selectOptions: userSelectOptions,
                _funcAccountExpiration: funcAccountExpiration,
                _funcRestrictedGuest: funcRestrictedGuest,
                _enumRole: enumRole,
                _enumLanguage: enumLanguage,
                _enumMailLanguage: enumMailLanguage
            }
        }).state("inconsistentuser.list", {
            "abstract": !0,
            url: "/list",
            resolve: {
                allInconsistents: ["User", function(User) {
                    return User.getAllInconsistent()
                }]
            },
            template: "<div ui-view></div>"
        }).state("inconsistentuser.list.all", {
            url: "/all",
            templateUrl: "ng_components/inconsistentuser/inconsistentuser_list.tpl.html",
            controller: "InconsistentUserAllListCtrl"
        }).state("inconsistentuser.list.detail", {
            url: "/:uuid",
            templateUrl: "ng_components/user/user_detail.tpl.html",
            controller: "UserDetailCtrl",
            resolve: {
                currentUser: ["allInconsistents", "$stateParams", function(allInconsistents, $stateParams) {
                    return _.find(allInconsistents, {
                        uuid: $stateParams.uuid
                    })
                }],
                maxExpiryDate: userMaxExpiryDate,
                restrictedGuestStatus: userRestrictedGuestStatus,
                selectOptions: userSelectOptions,
                _funcAccountExpiration: funcAccountExpiration,
                _funcRestrictedGuest: funcRestrictedGuest,
                _enumRole: enumRole,
                _enumLanguage: enumLanguage,
                _enumMailLanguage: enumMailLanguage
            }
        }).state("thread", {
            "abstract": !0,
            url: "/group",
            templateUrl: "ng_components/thread/thread.html"
        }).state("thread.list", {
            url: "/list?search",
            reloadOnSearch: !1,
            templateUrl: "ng_components/thread/thread_list.tpl.html",
            controller: "ThreadListCtrl"
        }).state("thread.detail", {
            url: "/:id?search",
            templateUrl: "ng_components/thread/thread_detail.tpl.html",
            controller: "ThreadDetailCtrl",
            resolve: {
                currentThread: ["$stateParams", "Thread", function($stateParams, Thread) {
                    return $stateParams.id ? Thread.get($stateParams.id) : void 0
                }]
            }
        }).state("mailinglist", {
            "abstract": !0,
            url: "/mailinglist",
            templateUrl: "ng_components/mailinglist/mailinglist.html"
        }).state("mailinglist.list", {
            url: "/list",
            templateUrl: "ng_components/mailinglist/mailinglist_list.tpl.html",
            controller: "MailingListListCtrl",
            resolve: {
                mailingLists: ["MailingList", function(MailingList) {
                    return MailingList.getAll()
                }]
            }
        }).state("mailinglist.detail", {
            url: "/:id",
            templateUrl: "ng_components/mailinglist/mailinglist_detail.tpl.html",
            controller: "MailingListDetailCtrl",
            resolve: {
                currentMailingList: ["$stateParams", "MailingList", function($stateParams, MailingList) {
                    return $stateParams.id ? MailingList.get($stateParams.id) : void 0
                }]
            }
        }).state("audit", {
            "abstract": !0,
            templateUrl: "ng_components/audit/audit.html"
        }).state("audit.form", {
            url: "/auditv1",
            views: {
                form: {
                    templateUrl: "ng_components/audit/audit_form.tpl.html",
                    controller: "AuditFormCtrl",
                    resolve: {
                        selectOptions: ["_allDomains", "_enumLogAction", function(_allDomains, _enumLogAction) {
                            return {
                                domains: _allDomains,
                                actions: _enumLogAction
                            }
                        }],
                        authenticatedUser: authenticatedUser,
                        _allDomains: ["Domain", function(Domain) {
                            return Domain.getAll()
                        }],
                        _enumLogAction: enumLogAction
                    }
                }
            }
        }).state("auditv2", {
            url: "/audit",
            templateUrl: "ng_components/auditv2/views/auditList.html",
            controller: "AuditController",
            controllerAs: "auditVm"
        }).state("ldapconnection", {
            "abstract": !0,
            url: "/ldapconnection",
            templateUrl: "ng_components/ldapconnection/ldapconnection.html"
        }).state("ldapconnection.list", {
            url: "/list",
            templateUrl: "ng_components/ldapconnection/ldapconnection_list.tpl.html",
            controller: "LdapConnectionListCtrl",
            resolve: {
                ldapConnections: ["LdapConnection", function(LdapConnection) {
                    return LdapConnection.getAll()
                }]
            }
        }).state("ldapconnection.detail", {
            url: "/:id?formState",
            templateUrl: "ng_components/ldapconnection/ldapconnection_detail.tpl.html",
            controller: "LdapConnectionDetailCtrl",
            resolve: {
                currentLdapConnection: ["$stateParams", "LdapConnection", function($stateParams, LdapConnection) {
                    return $stateParams.id ? LdapConnection.get($stateParams.id) : void 0
                }]
            }
        }).state("domainpattern", {
            "abstract": !0,
            url: "/domainpattern",
            templateUrl: "ng_components/domainpattern/domainpattern.html"
        }).state("domainpattern.list", {
            url: "/list",
            templateUrl: "ng_components/domainpattern/domainpattern_list.tpl.html",
            controller: "DomainPatternListCtrl",
            resolve: {
                domainPatterns: ["DomainPattern", function(DomainPattern) {
                    return DomainPattern.getAll()
                }]
            }
        }).state("domainpattern.detail", {
            url: "/:id?formState",
            templateUrl: "ng_components/domainpattern/domainpattern_detail.tpl.html",
            controller: "DomainPatternDetailCtrl",
            resolve: {
                currentDomainPattern: ["$stateParams", "DomainPattern", function($stateParams, DomainPattern) {
                    return $stateParams.id ? DomainPattern.get($stateParams.id) : void 0
                }],
                models: ["DomainPattern", function(DomainPattern) {
                    return DomainPattern.getAllModels()
                }]
            }
        }).state("domain", {
            url: "/domain",
            "abstract": !0,
            templateUrl: "ng_components/domain/domain.html",
            resolve: {
                treeTitle: function() {
                    return "COMMON.TAB.MANAGE_DOMAINS"
                },
                treeType: function() {
                    return "edit"
                }
            },
            controller: ["$scope", "$state", function($scope, $state) {
                $scope.$state = $state
            }]
        }).state("domain.detail", {
            url: "/detail/:domainId?formState&domainType",
            resolve: {
                authenticatedUser: authenticatedUser
            },
            views: {
                tree: domainTreeView,
                detail: {
                    templateUrl: "ng_components/domain/domain_detail.tpl.html",
                    controller: "DomainDetailCtrl",
                    resolve: {
                        selectOptions: ["_allLdapConnections", "_allDomainPatterns", "_allDomainPolicies", "_allMailConfigs", "_allMimePolicies", "_enumRole", "_enumLanguage", "_enumSupportedLanguage", function(_allLdapConnections, _allDomainPatterns, _allDomainPolicies, _allMailConfigs, _allMimePolicies, _enumRole, _enumLanguage, _enumSupportedLanguage) {
                            return {
                                ldapConnectionIds: _.object(_.pluck(_allLdapConnections, "uuid"), _.pluck(_allLdapConnections, "label")),
                                domainPatternIds: _.object(_.pluck(_allDomainPatterns, "uuid"), _.pluck(_allDomainPatterns, "label")),
                                domainPolicies: _allDomainPolicies,
                                mailConfigs: _allMailConfigs,
                                mimePolicies: _allMimePolicies,
                                userRoles: _.remove(_enumRole, function(role) {
                                    return "SYSTEM" !== role && "SUPERADMIN" !== role && "DELEGATION" !== role && "UPLOAD_PROPOSITION" !== role
                                }),
                                languages: _enumLanguage,
                                supportedLanguages: _enumSupportedLanguage
                            }
                        }],
                        currentDomain: ["Domain", "$stateParams", function(Domain, $stateParams) {
                            return $stateParams.domainId ? Domain.get($stateParams.domainId) : void 0
                        }],
                        _allWelcomeMessages: ["WelcomeMessage", "$stateParams", function(WelcomeMessage, $stateParams) {
                            return $stateParams.domainId ? WelcomeMessage.getAll($stateParams.domainId, !0) : void 0
                        }],
                        _allLdapConnections: ["LdapConnection", function(LdapConnection) {
                            return LdapConnection.getAll()
                        }],
                        _allDomainPatterns: ["DomainPattern", function(DomainPattern) {
                            return DomainPattern.getAll()
                        }],
                        _allDomainPolicies: ["DomainPolicy", function(DomainPolicy) {
                            return DomainPolicy.getAll()
                        }],
                        _allMailConfigs: ["currentDomain", "MailConfig", function(currentDomain, MailConfig) {
                            return currentDomain ? MailConfig.getAll(currentDomain.identifier, !1) : void 0
                        }],
                        _allMimePolicies: ["currentDomain", "MimePolicy", function(currentDomain, MimePolicy) {
                            return currentDomain ? MimePolicy.getAll(currentDomain.identifier, !1) : void 0
                        }],
                        _enumRole: enumRole,
                        _enumLanguage: enumLanguage,
                        _enumSupportedLanguage: enumMailLanguage
                    }
                }
            }
        }).state("domainorder", {
            "abstract": !0,
            url: "/domainorder",
            templateUrl: "ng_components/domainorder/domain_order.html"
        }).state("domainorder.order", {
            url: "/order",
            templateUrl: "ng_components/domainorder/domain_order.tpl.html",
            controller: "DomainOrderCtrl",
            resolve: {
                domains: ["Domain", function(Domain) {
                    return Domain.getAll()
                }]
            }
        }).state("domainpolicy", {
            "abstract": !0,
            url: "/domainpolicy",
            templateUrl: "ng_components/domainpolicy/domainpolicy.html"
        }).state("domainpolicy.list", {
            url: "/list",
            templateUrl: "ng_components/domainpolicy/domainpolicy_list.tpl.html",
            controller: "DomainPolicyListCtrl",
            resolve: {
                domainPolicies: ["DomainPolicy", function(DomainPolicy) {
                    return DomainPolicy.getAll()
                }]
            }
        }).state("domainpolicy.detail", {
            url: "/:id?formState",
            templateUrl: "ng_components/domainpolicy/domainpolicy_detail.tpl.html",
            controller: "DomainPolicyDetailCtrl",
            resolve: {
                selectOptions: ["_allDomains", "_enumDomainAccessRuleTypes", function(_allDomains, _enumDomainAccessRuleTypes) {
                    return {
                        domains: _allDomains,
                        domainAccessRuleTypes: _enumDomainAccessRuleTypes
                    }
                }],
                currentDomainPolicy: ["$stateParams", "DomainPolicy", function($stateParams, DomainPolicy) {
                    return $stateParams.id ? DomainPolicy.get($stateParams.id) : void 0
                }],
                _allDomains: ["Domain", function(Domain) {
                    return Domain.getAll()
                }],
                _enumDomainAccessRuleTypes: enumDomainAccessRuleTypes
            }
        }).state("maillayout", {
            "abstract": !0,
            url: "/maillayout",
            templateUrl: "ng_components/maillayout/maillayout.html",
            resolve: {
                treeTitle: function() {
                    return "COMMON.TAB.MAIL_LAYOUT"
                },
                treeType: function() {
                    return "read"
                },
                authenticatedUser: authenticatedUser,
                defaultDomain: ["authenticatedUser", function(authenticatedUser) {
                    return authenticatedUser.domain
                }]
            },
            controller: ["$scope", "$state", function($scope, $state) {
                $scope.$state = $state
            }]
        }).state("maillayout.list", {
            url: "/:domainId/list",
            views: {
                tree: domainTreeView,
                list: {
                    templateUrl: "ng_components/maillayout/maillayout_list.tpl.html",
                    controller: "MailLayoutListCtrl",
                    resolve: {
                        currentDomain: ["Domain", "$stateParams", "$state", "defaultDomain", function(Domain, $stateParams, $state, defaultDomain) {
                            var domainId = $stateParams.domainId || defaultDomain;
                            return Domain.get(domainId)
                        }],
                        mailLayouts: ["MailLayout", "currentDomain", function(MailLayout, currentDomain) {
                            return MailLayout.getAll(currentDomain.identifier, !0)
                        }]
                    }
                }
            }
        }).state("maillayout.detail", {
            url: "/:domainId/detail/:id",
            views: {
                tree: domainTreeView,
                detail: {
                    templateUrl: "ng_components/maillayout/maillayout_detail.tpl.html",
                    controller: "MailLayoutDetailCtrl",
                    resolve: {
                        currentDomain: ["Domain", "$stateParams", function(Domain, $stateParams) {
                            return Domain.get($stateParams.domainId)
                        }],
                        currentMailLayout: ["MailLayout", "currentDomain", "$state", "$stateParams", function(MailLayout, currentDomain, $state, $stateParams) {
                            return MailLayout.get($stateParams.domainId, $stateParams.id).then(function(data) {
                                return data.domain === currentDomain.identifier ? data : void $state.go("maillayout.list", {
                                    domainId: currentDomain.identifier
                                })
                            })
                        }]
                    }
                }
            }
        }).state("mailcontent", {
            "abstract": !0,
            url: "/mailcontent",
            templateUrl: "ng_components/mailcontent/mailcontent.html",
            resolve: {
                treeTitle: function() {
                    return "COMMON.TAB.MAIL_CONTENT"
                },
                treeType: function() {
                    return "read"
                },
                authenticatedUser: authenticatedUser
            },
            controller: ["$scope", "$state", function($scope, $state) {
                $scope.$state = $state
            }]
        }).state("mailcontent.list", {
            url: "/:domainId/list?language",
            views: {
                tree: domainTreeView,
                list: {
                    templateUrl: "ng_components/mailcontent/mailcontent_list.tpl.html",
                    controller: "MailContentListCtrl",
                    resolve: {
                        currentDomain: ["Domain", "$stateParams", function(Domain, $stateParams) {
                            return Domain.get($stateParams.domainId)
                        }],
                        mailContents: ["mailContentRestService", "currentDomain", function(mailContentRestService, currentDomain) {
                            return mailContentRestService.getAll(currentDomain.identifier, !0)
                        }],
                        MailLanguage: enumMailLanguage
                    }
                }
            }
        }).state("mailcontent.detail", {
            url: "/:domainId/detail/:id?language",
            views: {
                tree: domainTreeView,
                detail: {
                    templateUrl: "ng_components/mailcontent/mailcontent_detail.tpl.html",
                    controller: "MailContentDetailCtrl",
                    resolve: {
                        currentDomain: ["Domain", "$stateParams", function(Domain, $stateParams) {
                            return Domain.get($stateParams.domainId)
                        }],
                        currentMailContent: ["mailContentRestService", "currentDomain", "$state", "$stateParams", function(mailContentRestService, currentDomain, $state, $stateParams) {
                            return mailContentRestService.get($stateParams.domainId, $stateParams.id).then(function(data) {
                                return data.domain === currentDomain.identifier ? data : void $state.go("mailcontent.list", {
                                    domainId: currentDomain.identifier
                                })
                            })
                        }],
                        mailLanguage: enumMailLanguage,
                        mailConfigs: ["MailConfig", "currentDomain", function(MailConfig, currentDomain) {
                            return MailConfig.getAll(currentDomain.identifier, !0)
                        }]
                    }
                }
            }
        }).state("mailfooter", {
            "abstract": !0,
            url: "/mailfooter",
            templateUrl: "ng_components/mailfooter/mailfooter.html",
            resolve: {
                treeTitle: function() {
                    return "COMMON.TAB.MAIL_FOOTER"
                },
                treeType: function() {
                    return "read"
                },
                authenticatedUser: authenticatedUser
            },
            controller: ["$scope", "$state", function($scope, $state) {
                $scope.$state = $state
            }]
        }).state("mailfooter.list", {
            url: "/:domainId/list?language",
            views: {
                tree: domainTreeView,
                list: {
                    templateUrl: "ng_components/mailfooter/mailfooter_list.tpl.html",
                    controller: "MailFooterListCtrl",
                    resolve: {
                        currentDomain: ["Domain", "$stateParams", function(Domain, $stateParams) {
                            return Domain.get($stateParams.domainId)
                        }],
                        mailFooters: ["MailFooter", "currentDomain", function(MailFooter, currentDomain) {
                            return MailFooter.getAll(currentDomain.identifier, !0)
                        }],
                        MailLanguage: enumMailLanguage
                    }
                }
            }
        }).state("mailfooter.detail", {
            url: "/:domainId/detail/:id?language",
            views: {
                tree: domainTreeView,
                detail: {
                    templateUrl: "ng_components/mailfooter/mailfooter_detail.tpl.html",
                    controller: "MailFooterDetailCtrl",
                    resolve: {
                        currentDomain: ["Domain", "$stateParams", function(Domain, $stateParams) {
                            return Domain.get($stateParams.domainId)
                        }],
                        currentMailFooter: ["MailFooter", "currentDomain", "$state", "$stateParams", function(MailFooter, currentDomain, $state, $stateParams) {
                            return MailFooter.get($stateParams.domainId, $stateParams.id).then(function(data) {
                                return data.domain === currentDomain.identifier ? data : void $state.go("mailfooter.list", {
                                    domainId: currentDomain.identifier
                                })
                            })
                        }]
                    }
                }
            }
        }).state("mailconfig", {
            "abstract": !0,
            url: "/mailconfig",
            templateUrl: "ng_components/mailconfig/mailconfig.html",
            resolve: {
                treeTitle: function() {
                    return "COMMON.TAB.MAIL_CONFIG"
                },
                treeType: function() {
                    return "read"
                },
                authenticatedUser: authenticatedUser
            },
            controller: ["$scope", "$state", function($scope, $state) {
                $scope.$state = $state
            }]
        }).state("mailconfig.list", {
            url: "/:domainId/list",
            views: {
                tree: domainTreeView,
                list: {
                    templateUrl: "ng_components/mailconfig/mailconfig_list.tpl.html",
                    controller: "MailConfigListCtrl",
                    resolve: {
                        currentDomain: ["Domain", "$stateParams", function(Domain, $stateParams) {
                            return Domain.get($stateParams.domainId)
                        }],
                        mailConfigs: ["MailConfig", "currentDomain", function(MailConfig, currentDomain) {
                            return MailConfig.getAll(currentDomain.identifier, !0)
                        }]
                    }
                }
            }
        }).state("mailconfig.detail", {
            url: "/:domainId/detail/:id?language",
            views: {
                tree: domainTreeView,
                detail: {
                    templateUrl: "ng_components/mailconfig/mailconfig_detail.tpl.html",
                    controller: "MailConfigDetailCtrl",
                    resolve: {
                        mailLayouts: ["MailLayout", "$stateParams", function(MailLayout, $stateParams) {
                            return MailLayout.getAll($stateParams.domainId, !1)
                        }],
                        mailFooterLangs: ["MailConfig", "$stateParams", function(MailConfig, $stateParams) {
                            return MailConfig.getAllMailFooters($stateParams.id, $stateParams.language)
                        }],
                        currentDomain: ["Domain", "$stateParams", function(Domain, $stateParams) {
                            return Domain.get($stateParams.domainId)
                        }],
                        currentMailConfig: ["MailConfig", "currentDomain", "$state", "$stateParams", function(MailConfig, currentDomain, $state, $stateParams) {
                            return MailConfig.get($stateParams.domainId, $stateParams.id).then(function(data) {
                                return data.domain === currentDomain.identifier ? data : void $state.go("mailconfig.list", {
                                    domainId: currentDomain.identifier
                                })
                            })
                        }],
                        MailLanguage: enumMailLanguage
                    }
                }
            }
        }).state("mailconfig.mailcontentlang", {
            url: "/:domainId/mailcontentlang/:mailConfigId/:id",
            views: {
                tree: domainTreeView,
                mailcontentlang: {
                    templateUrl: "ng_components/mailcontent/mailcontentlang_detail.tpl.html",
                    controller: "MailContentLangDetailCtrl",
                    resolve: {
                        currentMailContentLang: ["MailContentLang", "$stateParams", function(MailContentLang, $stateParams) {
                            return MailContentLang.get($stateParams.id)
                        }],
                        mailContents: ["MailConfig", "currentMailContentLang", "$stateParams", function(MailConfig, currentMailContentLang, $stateParams) {
                            return MailConfig.getAllMailContents($stateParams.mailConfigId, currentMailContentLang.language, currentMailContentLang.mailContentType)
                        }]
                    }
                }
            }
        }).state("mailconfig.mailfooterlang", {
            url: "/:domainId/mailfooterlang/:mailConfigId/:id",
            views: {
                tree: domainTreeView,
                mailfooterlang: {
                    templateUrl: "ng_components/mailfooter/mailfooterlang_detail.tpl.html",
                    controller: "MailFooterLangDetailCtrl",
                    resolve: {
                        currentMailFooterLang: ["MailFooterLang", "$stateParams", function(MailFooterLang, $stateParams) {
                            return MailFooterLang.get($stateParams.id)
                        }],
                        mailFooters: ["MailConfig", "currentMailFooterLang", "$stateParams", function(MailConfig, currentMailFooterLang, $stateParams) {
                            return MailConfig.getAllMailFooters($stateParams.mailConfigId, currentMailFooterLang.language)
                        }]
                    }
                }
            }
        }).state("password", {
            url: "/password",
            templateUrl: "ng_components/password/password.html",
            controller: "PasswordCtrl"
        }).state("quota", {
            url: "/quota",
            "abstract": !0,
            templateUrl: "ng_components/quota/quota.html",
            resolve: {
                treeTitle: function() {
                    return "COMMON.TAB.MANAGE_QUOTA"
                },
                treeType: function() {
                    return "edit"
                }
            },
            controller: ["$scope", "$state", function($scope, $state) {
                $scope.$state = $state
            }]
        }).state("quota.detail", {
            url: "/detail/:domainId?formState&domainType",
            resolve: {
                authenticatedUser: authenticatedUser,
                domainDto: ["$stateParams", "Domain", function($stateParams, Domain) {
                    return Domain.get($stateParams.domainId)
                }],
                domainQuotaDto: ["domainDto", "quotaRestService", function(domainDto, quotaRestService) {
                    return quotaRestService.getDomain(domainDto.quota);

                }],
                parentDomainDto: ["Domain", "domainQuotaDto", function(Domain, domainQuotaDto) {
                    return domainQuotaDto.parentDomain ? Domain.get(domainQuotaDto.parentDomain.identifier) : null
                }],
                parentDomainQuotaDto: ["parentDomainDto", "quotaRestService", function(parentDomainDto, quotaRestService) {
                    return _.isNull(parentDomainDto) ? null : quotaRestService.getDomain(parentDomainDto.quota).then(function(data) {
                        return data.route = "parent" + data.route, data
                    })
                }],
                parentContainersQuotaDto: ["$q", "parentDomainQuotaDto", "quotaRestService", function($q, parentDomainQuotaDto, quotaRestService) {
                    return _.isNull(parentDomainQuotaDto) ? null : $q.all(_.map(parentDomainQuotaDto.containerUuids, function(parentContainerQuotaUuid) {
                        return quotaRestService.getContainer(parentContainerQuotaUuid).then(function(data) {
                            return data.route = "parent" + data.type.toLowerCase().replace("_", ""), data
                        })
                    })).then(function(parentContainersQuotaDto) {
                        return {
                            user: "USER" === parentContainersQuotaDto[0].type ? parentContainersQuotaDto[0] : parentContainersQuotaDto[1],
                            workgroup: "WORK_GROUP" === parentContainersQuotaDto[0].type ? parentContainersQuotaDto[0] : parentContainersQuotaDto[1]
                        }
                    })
                }]
            },
            views: {
                tree: domainQuotaTreeView,
                detail: {
                    templateUrl: "ng_components/quota/quota_detail.tpl.html",
                    controller: "QuotaDetailController",
                    controllerAs: "quotaVm"
                }
            }
        }).state("uploadpropositionfilter", {
            "abstract": !0,
            url: "/uploadpropositionfilter",
            templateUrl: "ng_components/uploadpropositionfilter/uploadpropositionfilter.html"
        }).state("uploadpropositionfilter.list", {
            url: "/list",
            templateUrl: "ng_components/uploadpropositionfilter/uploadpropositionfilter_list.tpl.html",
            controller: "UploadPropositionFilterListCtrl",
            resolve: {
                uploadPropositionFilters: ["UploadPropositionFilter", function(UploadPropositionFilter) {
                    return UploadPropositionFilter.getAll()
                }]
            }
        }).state("uploadpropositionfilter.detail", {
            url: "/:id?formState",
            templateUrl: "ng_components/uploadpropositionfilter/uploadpropositionfilter_detail.tpl.html",
            controller: "UploadPropositionFilterDetailCtrl",
            resolve: {
                currentUploadPropositionFilter: ["$stateParams", "UploadPropositionFilter", function($stateParams, UploadPropositionFilter) {
                    return $stateParams.id ? UploadPropositionFilter.get($stateParams.id) : void 0
                }],
                selectOptions: ["_enumUploadPropositionFieldTypes", "_enumUploadPropositionOperatorTypes", "_enumUploadPropositionActionTypes", "_enumUploadPropositionMatchTypes", function(_enumUploadPropositionFieldTypes, _enumUploadPropositionOperatorTypes, _enumUploadPropositionActionTypes, _enumUploadPropositionMatchTypes) {
                    return {
                        fieldTypes: _enumUploadPropositionFieldTypes,
                        operatorTypes: _enumUploadPropositionOperatorTypes,
                        actionTypes: _enumUploadPropositionActionTypes,
                        matchTypes: _enumUploadPropositionMatchTypes
                    }
                }],
                _enumUploadPropositionFieldTypes: enumUploadPropositionFieldTypes,
                _enumUploadPropositionOperatorTypes: enumUploadPropositionOperatorTypes,
                _enumUploadPropositionActionTypes: enumUploadPropositionActionTypes,
                _enumUploadPropositionMatchTypes: enumUploadPropositionMatchTypes
            }
        }).state("technicalaccount", {
            "abstract": !0,
            url: "/technicalaccount",
            templateUrl: "ng_components/technicalaccount/technicalaccount.html"
        }).state("technicalaccount.list", {
            url: "/list",
            templateUrl: "ng_components/technicalaccount/technicalaccount_list.tpl.html",
            controller: "TechnicalAccountListCtrl",
            resolve: {
                technicalAccounts: ["TechnicalAccount", function(TechnicalAccount) {
                    return TechnicalAccount.getAll()
                }]
            }
        }).state("technicalaccount.detail", {
            url: "/:id?formState",
            templateUrl: "ng_components/technicalaccount/technicalaccount_detail.tpl.html",
            controller: "TechnicalAccountDetailCtrl",
            resolve: {
                currentTechnicalAccount: ["$stateParams", "TechnicalAccount", function($stateParams, TechnicalAccount) {
                    return $stateParams.id ? TechnicalAccount.get($stateParams.id) : void 0
                }],
                selectOptions: ["_enumTechnicalAccountPermissionTypes", function(_enumTechnicalAccountPermissionTypes) {
                    return {
                        permissionTypes: _enumTechnicalAccountPermissionTypes
                    }
                }],
                _enumTechnicalAccountPermissionTypes: enumTechnicalAccountPermissionTypes
            }
        }).state("upgradetasks", {
            url: "/upgradetasks",
            "abstract": !0,
            template: "<div ui-view></div>"
        }).state("upgradetasks.list", {
            url: "/list",
            templateUrl: "ng_components/upgradetasks/views/upgradetasks.html",
            controller: "UpgradeTasksController",
            controllerAs: "upgradeTasksVm"
        }).state("upgradetasks.asynctasks", {
            url: "/:upgradeTasksId/asynctasks",
            "abstract": !0,
            template: "<div ui-view></div>",
            resolve: {
                upgradeTask: ["$stateParams", "upgradeTasksRestService", function($stateParams, upgradeTasksRestService) {
                    return upgradeTasksRestService.get($stateParams.upgradeTasksId)
                }]
            }
        }).state("upgradetasks.asynctasks.list", {
            url: "/list",
            templateUrl: "ng_components/upgradetasks/views/asynctasks.html",
            controller: "AsyncTasksController",
            controllerAs: "asyncTasksVm"
        }).state("upgradetasks.asynctasks.details", {
            url: "/:asyncTasksUuid",
            templateUrl: "ng_components/upgradetasks/views/asynctasks.details.html",
            controller: "AsyncTasksDetailsController",
            controllerAs: "asyncTaskVm",
            resolve: {
                asyncTask: ["$stateParams", "upgradeTasksRestService", function($stateParams, upgradeTasksRestService) {
                    return upgradeTasksRestService.getTask($stateParams.upgradeTasksId, $stateParams.asyncTasksUuid)
                }]
            }
        }).state("uploadrequest", {
            url: "/uploadrequest",
            "abstract": !0,
            templateUrl: "ng_components/uploadrequest/uploadrequest.html"
        }).state("uploadrequest.form", {
            url: "/form",
            templateUrl: "ng_components/uploadrequest/uploadrequest_form.tpl.html",
            controller: "UploadRequestFormCtrl",
            resolve: {
                uploadRequestStatus: enumUploadRequestStatus
            }
        })
    }]), angular.module("linshareAdminApp").factory("Audit", ["$log", "Restangular", function($log, Restangular) {
        return {
            query: function(criteria) {
                return $log.debug("Audit:query"), Restangular.all("logs").post(criteria)
            }
        }
    }]), angular.module("linshareAdminApp").controller("AuditFormCtrl", ["$rootScope", "$scope", "$filter", "$log", "$translate", "$locale", "ngTableParams", "Audit", "selectOptions", "authenticatedUser", function($rootScope, $scope, $filter, $log, $translate, $locale, ngTableParams, Audit, selectOptions, authenticatedUser) {
        $scope.criteria = {}, $scope.actorMails = "", $scope.targetMails = "", $scope.actorMails = authenticatedUser.mail, $scope.allActions = selectOptions.actions, $scope.allDomains = selectOptions.domains, $scope.opened = {
            from: !1,
            to: !1
        };
        var locales = {
            fr: {
                DATETIME_FORMATS: {
                    AMPMS: ["AM", "PM"],
                    DAY: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
                    MONTH: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
                    SHORTDAY: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
                    SHORTMONTH: ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."],
                    fullDate: "EEEE d MMMM y",
                    longDate: "d MMMM y",
                    medium: "d MMM y HH:mm:ss",
                    mediumDate: "d MMM y",
                    mediumTime: "HH:mm:ss",
                    "short": "dd/MM/yy HH:mm",
                    shortDate: "dd/MM/yy",
                    shortTime: "HH:mm"
                },
                NUMBER_FORMATS: {
                    CURRENCY_SYM: "€",
                    DECIMAL_SEP: ",",
                    GROUP_SEP: " ",
                    PATTERNS: [{
                        gSize: 3,
                        lgSize: 3,
                        macFrac: 0,
                        maxFrac: 3,
                        minFrac: 0,
                        minInt: 1,
                        negPre: "-",
                        negSuf: "",
                        posPre: "",
                        posSuf: ""
                    }, {
                        gSize: 3,
                        lgSize: 3,
                        macFrac: 0,
                        maxFrac: 2,
                        minFrac: 2,
                        minInt: 1,
                        negPre: "(",
                        negSuf: " ¤)",
                        posPre: "",
                        posSuf: " ¤"
                    }]
                },
                id: "fr-fr",
                pluralCat: function(n) {
                    return n >= 0 && 2 >= n && 2 !== n ? PLURAL_CATEGORY.ONE : PLURAL_CATEGORY.OTHER
                }
            },
            en: {
                DATETIME_FORMATS: {
                    AMPMS: ["AM", "PM"],
                    DAY: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    MONTH: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    SHORTDAY: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    SHORTMONTH: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    fullDate: "EEEE, MMMM d, y",
                    longDate: "MMMM d, y",
                    medium: "MMM d, y h:mm:ss a",
                    mediumDate: "MMM d, y",
                    mediumTime: "h:mm:ss a",
                    "short": "M/d/yy h:mm a",
                    shortDate: "M/d/yy",
                    shortTime: "h:mm a"
                },
                NUMBER_FORMATS: {
                    CURRENCY_SYM: "$",
                    DECIMAL_SEP: ".",
                    GROUP_SEP: ",",
                    PATTERNS: [{
                        gSize: 3,
                        lgSize: 3,
                        macFrac: 0,
                        maxFrac: 3,
                        minFrac: 0,
                        minInt: 1,
                        negPre: "-",
                        negSuf: "",
                        posPre: "",
                        posSuf: ""
                    }, {
                        gSize: 3,
                        lgSize: 3,
                        macFrac: 0,
                        maxFrac: 2,
                        minFrac: 2,
                        minInt: 1,
                        negPre: "(¤",
                        negSuf: ")",
                        posPre: "¤",
                        posSuf: ""
                    }]
                },
                id: "en-us",
                pluralCat: function(n) {
                    return 1 === n ? PLURAL_CATEGORY.ONE : PLURAL_CATEGORY.OTHER
                }
            }
        };
        angular.copy(locales[$translate.use()], $locale), $scope.criteria.beforeDate = new Date(new Date - 6048e5), $scope.criteria.afterDate = new Date, $rootScope.$on("$translateChangeSuccess", function() {
            angular.copy(locales[$translate.use()], $locale), $scope.criteria.beforeDate = new Date(new Date - 6048e5), $scope.criteria.afterDate = new Date
        }), $scope.open = function(key, $event) {
            $event.preventDefault(), $event.stopPropagation(), $scope.opened[key] = !0
        }, $scope.reloadList = function() {
            $scope.tableParams.reload()
        }, $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            sorting: {
                actionDate: "desc"
            }
        }, {
            debugMode: !1,
            total: 0,
            getData: function($defer, params) {
                var actorMails = $scope.actorMails.trim();
                $scope.criteria.actorMails = actorMails ? actorMails.split(",") : void 0;
                var targetMails = $scope.targetMails.trim();
                $scope.criteria.targetMails = targetMails ? targetMails.split(",") : void 0, Audit.query($scope.criteria).then(function(logs) {
                    var filteredData = params.filter() ? $filter("filter")(logs, params.filter()) : logs,
                        orderedData = params.sorting() ? $filter("orderBy")(filteredData, params.orderBy()) : logs;
                    params.total(orderedData.length), $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()))
                })
            }
        })
    }]),
    function() {
        angular.module("linshareAdminApp").constant("_", _)
    }(),
    function() {
        function AuditController(_, $filter, $scope, $translate, $translatePartialLoader, auditDetailsService, auditRestService, lsAppConfig, ngTableParams) {
            function activate() {
                $translatePartialLoader.addPart("audit"), $translate.refresh(), auditVm.beginDate = new Date, auditVm.endDate = new Date, auditVm.maxDate = new Date, auditVm.dateFormat = "fr" === $translate.use() ? FR_DATE_FORMAT : EN_DATE_FORMAT, auditVm.beginDate.setDate(auditVm.beginDate.getDate() - 7), findAuditActionsByDate()
            }

            function findAuditActionsByDate() {
                auditVm.beginDate.setHours(0, 0, 0, 0), auditVm.endDate.setHours(24, 0, 0, 0), auditRestService.getList({
                    beginDate: auditVm.beginDate.toISOString(),
                    endDate: auditVm.endDate.toISOString()
                }).then(function(auditActionsList) {
                    auditVm.itemsList = auditActionsList.plain(), auditDetailsService.generateAllDetails($scope.userLogged.uuid, auditVm.itemsList), _.isUndefined(auditVm.tableParams) ? launchTableParamsInitiation() : auditVm.tableParams.reload()
                })
            }

            function launchTableParamsInitiation() {
                auditVm.tableParams = new ngTableParams({
                    page: 1,
                    count: 25,
                    sorting: {
                        creationDate: "desc"
                    }
                }, {
                    debugMode: !1,
                    total: 0,
                    getData: function($defer, params) {
                        var orderedData = params.sorting() ? $filter("orderBy")(auditVm.itemsList, params.orderBy()) : auditVm.itemsList;
                        orderedData = params.filter ? $filter("filter")(orderedData, params.filter()) : orderedData, params.total(orderedData.length), $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()))
                    }
                })
            }
            var auditVm = this;
            const EN_DATE_FORMAT = lsAppConfig.dateFormat.en,
                FR_DATE_FORMAT = lsAppConfig.dateFormat.fr;
            auditVm.findAuditActionsByDate = findAuditActionsByDate, activate()
        }
        angular.module("linshareAdminApp").controller("AuditController", AuditController), AuditController.$inject = ["_", "$filter", "$scope", "$translate", "$translatePartialLoader", "auditDetailsService", "auditRestService", "lsAppConfig", "ngTableParams"]
    }(),
    function() {
        function auditDetails() {
            function linkFn(scope, element) {
                function attachToBody(dropdownList, element) {
                    var position = dropdownList.offset();
                    0 !== position.top && 0 !== position.left && (dropdownList.detach(), angular.element("body").append(dropdownList), dropdownList.css({
                        top: element.offset().top + "px",
                        left: 1283 + "px"
                    }))
                    
                }
                var dropdownList = angular.element(element[0].querySelector(".audit-dropdown"));
                scope.$watch(function() {
                    return element[0].querySelector(".btn-group").className
                }, function(className) {
                    "BODY" !== dropdownList[0].parentElement.nodeName && attachToBody(dropdownList, element), -1 !== className.indexOf("open") ? (dropdownList.addClass("audit-dropdown-open"), dropdownList.removeClass("hide")) : (dropdownList.removeClass("audit-dropdown-open"), dropdownList.addClass("hide"))
                })
            }
            var directive = {
                restrict: "A",
                templateUrl: "ng_components/auditv2/directives/audit-details/audit-details.html",
                link: linkFn
            };
            return directive
        }
        angular.module("linshareAdminApp").directive("auditDetails", auditDetails)
    }(),
    function() {
        function calendarTimeFilter($translate, moment) {
            function calendarTimeToShow(seconds) {
                return moment(seconds).format("LLLL")
            }
            return moment.locale($translate.use()), calendarTimeToShow
        }
        angular.module("linshareAdminApp").filter("calendarTime", calendarTimeFilter), calendarTimeFilter.$inject = ["$translate", "moment"]
    }(),
    function() {
        function relativeTimeFilter($translate, moment) {
            function relativeTimeToShow(seconds) {
                return moment(seconds).fromNow()
            }
            return moment.locale($translate.use()), relativeTimeToShow
        }
        angular.module("linshareAdminApp").filter("relativeTime", relativeTimeFilter), relativeTimeFilter.$inject = ["$translate", "moment"]
    }(),
    function() {
        function shortTimeFilter($translate, moment) {
            function shortTimeToShow(seconds) {
                return moment(seconds).format("L")
            }
            return moment.locale($translate.use()), shortTimeToShow
        }
        angular.module("linshareAdminApp").filter("shortTime", shortTimeFilter), shortTimeFilter.$inject = ["$translate", "moment"]
    }(),
    function() {
        function translateIfFilter($filter) {
            function translateIf(value, canTranslate) {
                return canTranslate ? $filter("translate")(value) : value
            }
            return translateIf
        }
        angular.module("linshareAdminApp").filter("translateIf", translateIfFilter), translateIfFilter.$inject = ["$filter"]
    }(),
    function() {
        function auditRestService($log, Restangular) {
            function getList(params) {
                return $log.debug("auditRestService : getList"), Restangular.all(restUrl).getList(params)
            }
            var restUrl = "audit",
                service = {
                    getList: getList
                };
            return service
        }
        angular.module("linshareAdminApp").factory("auditRestService", auditRestService), auditRestService.$inject = ["$log", "Restangular"]
    }(),
    function() {
        function auditDetailsService(_, $filter, lsAppConfig) {
            function generateAllDetails(loggedUserUuid, auditDetails) {
                authorMe = $filter("translate")("AUTHOR_ME"), authorSuperadmin = $filter("translate")("AUTHOR_SUPERADMIN"), authorSystem = $filter("translate")("AUTHOR_SYSTEM"), disabled = $filter("translate")("DISABLED"), enabled = $filter("translate")("ENABLED"), _.forEach(auditDetails, function(auditAction) {
                    auditAction.resource ? generateDetails(loggedUserUuid, auditAction) : (auditAction.resource = auditAction.authUser, generateDetails(loggedUserUuid, auditAction))
                })
            }

            function generateDetails(loggedUserUuid, auditAction) {
                auditAction.isAuthor = setIsAuthor(auditAction, loggedUserUuid), auditAction.authorName = setAuthorName(auditAction), auditAction.authorReference = setAuthorReference(auditAction), auditAction.dateShortVarious = setDateVarious(auditAction, "shortTime"), auditAction.dateCalendarVarious = setDateVarious(auditAction, "calendarTime"), auditAction.resourceName = setResourceName(auditAction, loggedUserUuid), auditAction.resourceNameVarious = setResourceNameVarious(auditAction), auditAction.userVarious = setUserVarious(auditAction, loggedUserUuid), auditAction.shareRecipient = setShareRecipient(auditAction, loggedUserUuid), auditAction.icon = setTypeIcon(auditAction.type), auditAction.hasBracket = setHasBracket(auditAction.type), auditAction.sentenceKey = setSentenceKey(auditAction, ".SENTENCE"), auditAction.sentenceAction = setSentenceKey(auditAction, ".ACTION"), auditAction.sentenceVars = setSentenceVars(auditAction), auditAction.updatedValues = setUpdatedValues(auditAction), auditAction.translatedAction = setTranslatedVar(auditAction.action, "ACTION."), auditAction.translatedType = setTranslatedVar(auditAction.type, "TYPE.")
            }

            function booleanHumanReadable(value) {
                return "boolean" == typeof value ? value ? enabled : disabled : value
            }

            function setAuthorReference(auditAction) {
                return auditAction.isAuthor ? "AUTHOR" : "VIEWER"
            }

            function setAuthorName(auditAction) {
                return auditAction.isAuthor ? authorMe : setFullName(auditAction.actor)
            }

            function setDateVarious(auditAction, timeType) {
                return $filter(timeType)(auditAction.creationDate)
            }

            function setFullName(user) {
                var fullName;
                return fullName = user.role === lsAppConfig.accountType.system ? authorSystem : user.role === lsAppConfig.accountType.superadmin ? authorSuperadmin : user.name ? user.name : user.firstName || user.lastName ? user.firstName + " " + user.lastName : user.mail
            }

            function setHasBracket(resourceType) {
                return -1 !== CONTAINERS_CHILDREN.indexOf(resourceType)
            }

            function setIsAuthor(auditAction, loggedUserUuid) {
                return auditAction.authUser.uuid === loggedUserUuid
            }

            function setResourceName(auditAction, loggedUserUuid) {
                var resourceName;
                return resourceName = auditAction.resource.user ? auditAction.resource.user.uuid === loggedUserUuid ? authorMe : setFullName(auditAction.resource.user) : auditAction.resource.firstName ? auditAction.resource.uuid === loggedUserUuid ? authorMe : setFullName(auditAction.resource) : auditAction.resource.name
            }

            function setResourceNameVarious(auditAction) {
                var resourceNameVarious;
                return auditAction.workGroup ? resourceNameVarious = auditAction.workGroup.name : auditAction.list && (resourceNameVarious = auditAction.list.name), resourceNameVarious
            }

            function setSentenceKey(auditAction, key) {
                var action = auditAction.action;
                return _.isUndefined(auditAction.cause) || ("UNDEFINED" !== auditAction.cause ? action = auditAction.cause : auditAction.cause = ACTIONS_KEY.DELETE), SENTENCES_KEYS_PREFIX + "." + auditAction.type + "." + action + "." + auditAction.authorReference + key
            }

            function setShareRecipient(auditAction, loggedUserUuid) {
                var shareRecipient;
                return (auditAction.type === TYPES_KEY.ANONYMOUS_SHARE_ENTRY || auditAction.type === TYPES_KEY.SHARE_ENTRY) && (shareRecipient = auditAction.resource.recipient ? auditAction.resource.recipient.uuid === loggedUserUuid ? authorMe : setFullName(auditAction.resource.recipient) : auditAction.recipientMail), shareRecipient || ""
            }

            function setSentenceVars(auditAction) {
                return {
                    authorName: "<b>" + auditAction.authorName + "</b>",
                    dateVarious: '<b title="' + auditAction.dateCalendarVarious + '">' + auditAction.dateShortVarious + "</b>",
                    userVarious: '<span class="activity-user-target">' + auditAction.userVarious + "</span>",
                    resourceName: '<span class="activity-resource-name">' + auditAction.resourceName + "</span>",
                    resourceNameVarious: '<span class="activity-resource-name">' + auditAction.resourceNameVarious + "</span>",
                    updatedValues: "<b>" + auditAction.updatedValues + "</b>"
                }
            }

            function setTypeIcon(resourceType) {
                return TYPE_ICONS[resourceType]
            }

            function setTranslatedVar(originalString, key) {
                return $filter("translate")("FILTERS_SELECT." + key + originalString)
            }

            function setUpdatedValues(auditAction) {
                var updatedValues = {};
                return auditAction.action === ACTIONS_KEY.UPDATE && (setUpdatedValuesDeepFind(auditAction.resource, auditAction.resourceUpdated, updatedValues), (updatedValues.firstName || updatedValues.lastName) && delete updatedValues.name, setUpdatedValuesGuestExpirationDate(auditAction, updatedValues), setUpdatedValuesWorkgroupDocument(auditAction, updatedValues), setUpdatedValuesWorkgroupMember(auditAction, updatedValues)), updatedValues
            }

            function setUpdatedValuesDeepFind(oldValues, newValues, updatedValues) {
                _.forEach(newValues, function(value, key) {
                    "object" == typeof value || "[object Array]" === Object.prototype.toString.call(value) ? setUpdatedValuesDeepFind(value, newValues[key]) : oldValues[key] !== newValues[key] && -1 !== UPDATE_FIELDS_TO_CHECK.indexOf(key) && (updatedValues[key] = {
                        keyName: UPDATE_FIELDS_KEYS_PREFIX + UPDATE_FIELDS_KEY[key],
                        oldValue: booleanHumanReadable(oldValues[key]),
                        newValue: booleanHumanReadable(newValues[key])
                    })
                })
            }

            function setUpdatedValuesGuestExpirationDate(auditAction, updatedValues) {
                if (auditAction.type === TYPES_KEY.GUEST) {
                    var oldDate = auditAction.resource.expirationDate,
                        newDate = auditAction.resourceUpdated.expirationDate;
                    oldDate !== newDate && (updatedValues.expirationDate = {
                        keyName: UPDATE_FIELDS_KEYS_PREFIX + UPDATE_FIELDS_KEY.expirationDate,
                        oldValue: $filter("shortTime")(oldDate),
                        newValue: $filter("shortTime")(newDate),
                        oldValueFull: $filter("calendarTime")(oldDate),
                        newValueFull: $filter("calendarTime")(newDate)
                    })
                }
            }

            function setUpdatedValuesWorkgroupDocument(auditAction, updatedValues) {
                if (auditAction.type === TYPES_KEY.WORKGROUP_DOCUMENT) {
                    var oldFolder = auditAction.resource.treePath[auditAction.resource.treePath.length - 1],
                        newFolder = auditAction.resourceUpdated.treePath[auditAction.resourceUpdated.treePath.length - 1];
                    oldFolder.uuid !== newFolder.uuid && (updatedValues.right = {
                        keyName: UPDATE_FIELDS_KEYS_PREFIX + UPDATE_FIELDS_KEY.folder,
                        oldValue: oldFolder.name,
                        newValue: newFolder.name
                    })
                }
            }

            function setUpdatedValuesWorkgroupMember(auditAction, updatedValues) {
                if (auditAction.type === TYPES_KEY.WORKGROUP_MEMBER) {
                    var oldRights = setUpdatedValuesWorkgroupMemberRights(auditAction.resource),
                        newRights = setUpdatedValuesWorkgroupMemberRights(auditAction.resourceUpdated);
                    oldRights !== newRights && (updatedValues.right = {
                        keyName: UPDATE_FIELDS_KEYS_PREFIX + UPDATE_FIELDS_KEY.right,
                        oldValue: UPDATE_FIELDS_RIGHTS_KEYS_PREFIX + oldRights,
                        newValue: UPDATE_FIELDS_RIGHTS_KEYS_PREFIX + newRights,
                        rightsUpdate: !0
                    })
                }
            }

            function setUpdatedValuesWorkgroupMemberRights(memberRights) {
                var role;
                return role = memberRights.admin ? lsAppConfig.roles.admin : !memberRights.admin && memberRights.canUpload ? lsAppConfig.roles.write : lsAppConfig.roles.readonly
            }

            function setUserVarious(auditAction, loggedUserUuid) {
                var userVarious;
                return auditAction.resource.firstName ? userVarious = auditAction.resource.uuid === loggedUserUuid ? authorMe : setFullName(auditAction.resource) : auditAction.resource.sender && auditAction.resource.sender.uuid !== auditAction.actor.uuid ? userVarious = auditAction.resource.sender.uuid === loggedUserUuid ? authorMe : setFullName(auditAction.resource.sender) : auditAction.resource.recipient ? userVarious = auditAction.resource.recipient.uuid === loggedUserUuid ? authorMe : setFullName(auditAction.resource.recipient) : auditAction.recipientMail && (userVarious = auditAction.recipientMail), userVarious
            }
            const ACTIONS_KEY = {
                    ADDITION: "ADDITION",
                    COPY: "COPY",
                    CREATE: "CREATE",
                    CREATE_SHARE: "CREATE_SHARE",
                    DELETE: "DELETE",
                    DOWNLOAD: "DOWNLOAD",
                    FAILURE: "FAILURE",
                    READ: "READ",
                    RECEIVE_SHARE: "RECEIVE_SHARE",
                    TRANSFER: "TRANSFER",
                    SUCCESS: "SUCCESS",
                    UPDATE: "UPDATE",
                    UPLOAD: "UPLOAD",
                    VIEWED: "VIEWED"
                },
                CONTAINERS_CHILDREN = ["CONTACTS_LISTS_CONTACTS", "GUEST", "WORKGROUP_DOCUMENT", "WORKGROUP_FOLDER", "WORKGROUP_MEMBER"],
                SENTENCES_KEYS_PREFIX = "DETAILS_POPUP.SENTENCES",
                TYPE_ICONS = {
                    ANONYMOUS_SHARE_ENTRY: "fa fa-share",
                    AUTHENTICATION: "ls-my-profile",
                    CONTACTS_LISTS: "ls-contact-list-item",
                    CONTACTS_LISTS_CONTACTS: "ls-contact-list-item",
                    DOCUMENT_ENTRY: "fa fa-file",
                    FUNCTIONALITY: "fa fa-gears",
                    GUEST: "ls-guest-account",
                    SHARE_ENTRY: "fa fa-share",
                    USER: "fa fa-user",
                    WORKGROUP: "ls-workgroup",
                    WORKGROUP_DOCUMENT: "fa fa-file",
                    WORKGROUP_FOLDER: "ls-folder",
                    WORKGROUP_MEMBER: "ls-user"
                },
                TYPES_KEY = {
                    ANONYMOUS_SHARE_ENTRY: "ANONYMOUS_SHARE_ENTRY",
                    AUTHENTICATION: "AUTHENTICATION",
                    CONTACTS_LISTS: "CONTACTS_LISTS",
                    CONTACTS_LISTS_CONTACTS: "CONTACTS_LISTS_CONTACTS",
                    DOCUMENT_ENTRY: "DOCUMENT_ENTRY",
                    FUNCTIONALITY: "FUNCTIONALITY",
                    GUEST: "GUEST",
                    SHARE_ENTRY: "SHARE_ENTRY",
                    USER: "USER",
                    WORKGROUP: "WORKGROUP",
                    WORKGROUP_DOCUMENT: "WORKGROUP_DOCUMENT",
                    WORKGROUP_FOLDER: "WORKGROUP_FOLDER",
                    WORKGROUP_MEMBER: "WORKGROUP_MEMBER"
                },
                UPDATE_FIELDS_KEY = {
                    canCreateGuest: "CAN_CREATE_GUEST",
                    canUpload: "CAN_UPLOAD",
                    expirationDate: "EXPIRATION_DATE",
                    name: "NAME",
                    identifier: "NAME",
                    firstName: "FIRST_NAME",
                    lastName: "LAST_NAME",
                    mail: "NAME",
                    restricted: "RESTRICTED",
                    right: "RIGHT",
                    folder: "FOLDER"
                },
                UPDATE_FIELDS_KEYS_PREFIX = "DETAILS_POPUP.UPDATED_FIELDS.",
                UPDATE_FIELDS_RIGHTS_KEYS_PREFIX = "DETAILS_POPUP.UPDATED_FIELDS_RIGHTS.",
                UPDATE_FIELDS_TO_CHECK = ["canCreateGuest", "canUpload", "expirationDate", "firstName", "identifier", "lastName", "mail", "name", "restricted", "folder"];
            var authorMe, authorSuperadmin, authorSystem, disabled, enabled, service = {
                generateAllDetails: generateAllDetails
            };
            return service
        }
        angular.module("linshareAdminApp").factory("auditDetailsService", auditDetailsService), auditDetailsService.$inject = ["_", "$filter", "lsAppConfig"]
    }(),
    function() {
        angular.module("lsDropdownApp", ["ui.bootstrap"])
    }(),
    function() {
        function lsDropdown() {
            function linkFn(scope, element) {
                function attachToBody(dropdownList) {
                    var position = dropdownList.offset();
                    0 !== position.top && 0 !== position.left && (dropdownList.detach(), angular.element("body").append(dropdownList), dropdownList.css({
                        top: position.top + "px",
                        "margin-top": "17px",
                        "margin-left": "-21px",
                        left: position.left + "px",
                        display: "block"
                    }))
                }
                var dropdownList = angular.element(element[0].querySelector(".ls-dropdown"));
                scope.$watch(function() {
                    return element[0].querySelector(".btn-group").className
                }, function(className) {
                    -1 !== className.indexOf("open") ? ("BODY" !== dropdownList[0].parentElement.nodeName && attachToBody(dropdownList), dropdownList.addClass("ls-dropdown-open")) : dropdownList.removeClass("ls-dropdown-open")
                })
            }
            var directive = {
                restrict: "A",
                templateUrl: "ng_components/common/lsdropdown/lsdropdown.html",
                scope: {
                    value: "=value",
                    list: "=list",
                    action: "&action"
                },
                link: linkFn
            };
            return directive
        }
        angular.module("lsDropdownApp").directive("lsDropdown", lsDropdown), lsDropdown.$inject = []
    }(),
    function() {
        function unitMax(_, unitService) {
            function linkFn(scope, element, attrs, modelController) {
                function validUnit(val) {
                    var value;
                    if (_.isFunction(val)) value = val();
                    else {
                        if (isNaN(val)) return void modelController.$setValidity("unitMax", !1);
                        value = val
                    }
                    return unitService.toByte(value, scope.unit) > scope.unitMax ? void modelController.$setValidity("unitMax", !1) : (modelController.$setValidity("unitMax", !0), value)
                }
                modelController.$parsers.unshift(validUnit)
            }
            var directive = {
                restrict: "A",
                require: "ngModel",
                link: linkFn,
                scope: {
                    unitMax: "=unitMax",
                    unit: "=unit"
                }
            };
            return directive
        }
        angular.module("linshareAdminApp").directive("unitMax", unitMax), unitMax.$inject = ["_", "unitService"]
    }(), angular.module("linshareAdminApp").directive("lsHelp", ["$rootScope", "$translate", "Authentication", function($rootScope, $translate, Authentication) {
        function getDomain() {
            return Authentication.getCurrentUser()
        }

        function getTemplate(content) {
            return "/i18n/templates/mainview/" + $translate.use() + "/" + content + ".tpl.html"
        }

        function linker(scope) {
            scope.template = getTemplate(scope.content), getDomain().then(function(user) {
                scope.domain = user.domain
            }), $rootScope.$on("$translateChangeSuccess", function() {
                scope.template = getTemplate(scope.content)
            })
        }
        return {
            restrict: "E",
            scope: {
                content: "="
            },
            link: linker,
            templateUrl: "ng_components/common/help.tpl.html"
        }
    }]), angular.module("linshareAdminApp").directive("boxTreeDomain", ["$window", function($window) {
        return {
            restrict: "C",
            link: function(scope, element) {
                var bodyHeight = $window.innerHeight - 250;
                element.css("height", bodyHeight > 400 ? bodyHeight : 400)
            }
        }
    }]), angular.module("linshareAdminApp").directive("lsAlertBox", [function() {
        return {
            restrict: "A",
            scope: !1,
            controller: ["$scope", function($scope) {
                $scope.alerts = [], $scope.$on("pushAlert", function(event, newAlert) {
                    $scope.alerts.push(newAlert), window.scrollTo(0, 0)
                }), $scope.closeAlert = function(index) {
                    $scope.alerts.splice(index, 1)
                }
            }],
            templateUrl: "ng_components/common/alert.tpl.html",
            replace: !1
        }
    }]), angular.module("linshareAdminApp").directive("lsAlertTimeout", ["$timeout", function($timeout) {
        return {
            restrict: "A",
            scope: !1,
            link: function(scope, element, attrs) {
                var time = "success" === attrs.type ? 4e3 : 8e3;
                "success" === attrs.type ? $timeout(function() {
                    element.fadeTo(500, 0).slideUp(500, function() {
                        element.children().click()
                    })
                }, time) : $timeout(function() {
                    element.fadeTo(1, .7)
                }, time)
            },
            replace: !1
        }
    }]), angular.module("linshareAdminApp").factory("Authentication", ["$route", "$cookies", "$q", "$log", "Base64", "Restangular", "authService", "Notification", function($route, $cookies, $q, $log, Base64, Restangular, authService, Notification) {
        var deferred = $q.defer();
        this.waitingForResponse = !1;
        var self = this;
        return Restangular.all("authentication").customGET("authorized").then(function(user) {
            deferred.resolve(user)
        }), {
            request: function(login, password, errorCallback) {
                return self.waitingForResponse = !0, $log.debug("Authentication:request"), Restangular.all("authentication").customGET("authorized", {
                    ignoreAuthModule: !0
                }, {
                    Authorization: "Basic " + Base64.encode(login + ":" + password)
                }).then(function(user) {
                    $log.debug("Connected as " + user.mail), deferred.resolve(user), authService.loginConfirmed(), self.waitingForResponse = !1
                }, function(response) {
                    return $log.error(["Authentication:request", "Authentication failed", response.status].join("\n")), errorCallback()
                })
            },
            isSuperAdmin: function(user) {
                return "SUPERADMIN" === user.role
            },
            changePassword: function(password) {
                $log.debug("Authentication:changePassword"), Restangular.all("authentication").all("change_password").post(password).then(function() {
                    Notification.addSuccess("UPDATE")
                })
            },
            logout: function() {
                $log.debug("Authentication:logout"), Restangular.all("authentication").one("logout").get().then(function() {
                    delete $cookies.JSESSIONID, Restangular.all("authentication").customGET("authorized").then(function(user) {
                        deferred.resolve(user)
                    })
                })
            },
            version: function() {
                return $log.debug("Authentication:version"), Restangular.one("authentication", "version").get()
            },
            isWaitingForResponse: function() {
                return self.waitingForResponse
            },
            getCurrentUser: function() {
                return deferred.promise
            }
        }
    }]), angular.module("linshareAdminApp").controller("ConfirmDialogCtrl", ["$scope", "$log", "$modalInstance", "content", function($scope, $log, $modalInstance, content) {
        $scope.content = content, $scope.validate = function() {
            $modalInstance.close()
        }, $scope.cancel = function() {
            $modalInstance.dismiss("cancel")
        }
    }]), angular.module("linshareAdminApp").service("Enum", ["$log", "Restangular", function($log, Restangular) {
        return {
            getOptions: function(name) {
                return $log.debug("Enum:getOptions:" + name), Restangular.all("enums").all(name).options()
            }
        }
    }]), angular.module("linshareAdminApp").directive("lsFooter", ["lsAppConfig", "$rootScope", function(lsAppConfig, $rootScope) {
        var getTemplate = function() {
                return lsAppConfig.license ? "ng_components/common/footer_en.tpl.html" : void 0
            },
            linker = function(scope) {
                scope.template = getTemplate(), $rootScope.$on("$translateChangeSuccess", function() {
                    scope.template = getTemplate()
                })
            };
        return {
            restrict: "A",
            transclude: !0,
            scope: !1,
            link: linker,
            templateUrl: lsAppConfig.license ? "ng_components/common/footer.tpl.html" : "",
            replace: !1
        }
    }]), angular.module("linshareAdminApp").directive("lsFormAttempt", [function() {
        return {
            restrict: "A",
            controller: function() {
                this.attempted = !1;
                var attemptHandlers = [];
                this.onAttempt = function(handler) {
                    attemptHandlers.push(handler)
                }, this.setAttempted = function() {
                    this.attempted = !0, angular.forEach(attemptHandlers, function(handler) {
                        handler()
                    })
                }
            },
            compile: function() {
                return {
                    pre: function(scope, formElement, attributes, attemptController) {
                        scope.ls = scope.ls || {}, scope.ls[attributes.name] = attemptController
                    },
                    post: function(scope, formElement, attributes, attemptController) {
                        formElement.bind("submit", function() {
                            attemptController.setAttempted(), scope.$$phase || scope.$apply()
                        })
                    }
                }
            }
        }
    }]), angular.module("linshareAdminApp").directive("lsFormSubmit", ["$parse", function($parse) {
        return {
            restrict: "A",
            require: "form",
            link: function(scope, formElement, attributes, formController) {
                var fn = $parse(attributes.lsFormSubmit);
                formElement.bind("submit", function(event) {
                    return formController.$valid ? void scope.$apply(function() {
                        fn(scope, {
                            $event: event
                        })
                    }) : !1
                })
            }
        }
    }]), angular.module("linshareAdminApp").factory("Languages", ["_", "$log", "$translate", "Enum", "Notification", function(_, $log, $translate, Enum, Notification) {
        var languages = {
            fr: "FRENCH",
            en: "ENGLISH"
        };
        return {
            getCurrentLang: function() {
                var current = $translate.use();
                return languages[current] ? {
                    local: current,
                    filter: languages[current]
                } : {
                    local: "en",
                    filter: "ENGLISH"
                }
            },
            langCmp: function(lang) {
                var currentLang = {};
                return angular.forEach(languages, function(value, key) {
                    return value === lang || key === lang ? (currentLang.filter = value, currentLang.local = key, currentLang) : void 0
                }, currentLang), _.isEqual({}, currentLang) ? (Notification.addError({
                    status: 400,
                    errCode: 2e4
                }), this.getCurrentLang()) : currentLang
            }
        }
    }]);
var LoginModalInstanceCtrl = ["$scope", "$timeout", "$modalInstance", "Authentication", function($scope, $timeout, $modalInstance, Authentication) {
    $scope.input = {}, $scope.$on("event:auth-loginRequired", function() {
        $scope.errorLogin = Authentication.isWaitingForResponse(), $timeout(function() {
            $scope.errorLogin = !1
        }, 2e3)
    }), $scope.submit = function() {
        Authentication.request($scope.input.login, $scope.input.password)
    }, this.close = function() {
        $modalInstance.close()
    }
}];
angular.module("linshareAdminApp").controller("LoginFormCtrl", ["$scope", "$log", "$modal", function($scope, $log, $modal) {
        var modalInstance;
        $scope.$on("event:auth-loginRequired", function() {
            $log.debug("event:auth-loginRequired received"), angular.isUndefined(modalInstance) && (modalInstance = $modal.open({
                backdrop: "static",
                controller: LoginModalInstanceCtrl,
                templateUrl: "ng_components/common/login_form.tpl.html"
            }))
        }), $scope.$on("event:auth-loginConfirmed", function() {
            $log.debug("event:auth-loginConfirmed received"), angular.isDefined(modalInstance) && modalInstance.close(), modalInstance = void 0
        })
    }]), angular.module("linshareAdminApp").factory("MimeType", ["$log", "Notification", "Restangular", function($log, Notification, Restangular) {
        return {
            update: function(mimeType) {
                return $log.debug("MimeType:update"), Restangular.all("mime_types").customPUT(mimeType)
            }
        }
    }]), angular.module("linshareAdminApp").directive("lsNavbar", [function() {
        return {
            restrict: "A",
            transclude: !1,
            scope: !1,
            controller: ["_", "$q", "$rootScope", "$scope", "$log", "$translate", "tmhDynamicLocale", "Authentication", "lsAppConfig", "upgradeTasksConstants", "upgradeTasksRestService", function(_, $q, $rootScope, $scope, $log, $translate, tmhDynamicLocale, Authentication, lsAppConfig, upgradeTasksConstants, upgradeTasksRestService) {
                Authentication.getCurrentUser().then(function(user) {
                    $scope.userLogged = user, $scope.isSuperAdmin = Authentication.isSuperAdmin(user)
                }), $scope.license = lsAppConfig.license, $scope.setLanguage = function(value) {
                    $translate.use(value)
                }, $rootScope.$on("$translateChangeSuccess", function() {
                    var lang = $translate.use();
                    $log.debug("Language: switched to " + lang), tmhDynamicLocale.set(lang)
                }), $scope.isCurrentLang = function(value) {
                    return $translate.use() === value
                }, $scope.logout = function() {
                    Authentication.logout()
                }, $scope.upgradeTasks = {
                    criticality: upgradeTasksConstants.criticality,
                    getCriticality: function() {
                        var crit = {
                            order: -1
                        };
                        return _.forEach(upgradeTasksConstants.criticality, function(criticality) {
                            _.some($scope.upgradeTasks.list, {
                                criticality: criticality.value
                            }) && criticality.order > crit.order && (crit = criticality)
                        }), crit.value
                    },
                    getList: function(refresh) {
                        var deferred = $q.defer();
                        return _.isUndefined($scope.upgradeTasks.list) || refresh ? upgradeTasksRestService.getList().then(function(upgradeTasksData) {
                            $scope.upgradeTasks.list = upgradeTasksData, deferred.resolve($scope.upgradeTasks.list)
                        }) : deferred.resolve($scope.upgradeTasks.list), deferred.promise
                    },
                    hasSome: function() {
                        return _.some($scope.upgradeTasks.list, {
                            status: $scope.upgradeTasks.status.NEW
                        })
                    },
                    status: upgradeTasksConstants.status
                }, $scope.upgradeTasks.getList()
            }],
            templateUrl: "ng_components/common/navbar.tpl.html",
            replace: !1
        }
    }]), angular.module("linshareAdminApp").factory("Notification", ["$rootScope", "$timeout", "$log", "lsAppConfig", function($rootScope, $timeout, $log, lsAppConfig) {
        return {
            addSuccess: function(action) {
                $log.debug("Notification:addSuccess");
                var newAlert = {};
                newAlert.type = "success", newAlert.msg = "COMMON.NOTIFICATION.SUCCESS." + action, $rootScope.$broadcast("pushAlert", newAlert)
            },
            addError: function(newAlert) {
                $log.debug("Notification:addError"), newAlert.date = new Date, void 0 !== newAlert.status && newAlert.status >= 500 && newAlert.status < 600 ? (newAlert.type = "danger", newAlert.errorType = 500, newAlert.url = lsAppConfig.backendURL, newAlert.msg = "COMMON.NOTIFICATION.ERROR." + newAlert.status, $rootScope.$broadcast("pushAlert", newAlert)) : (newAlert.type = "danger", newAlert.msg = "COMMON.NOTIFICATION.ERROR." + newAlert.errCode, $rootScope.$broadcast("pushAlert", newAlert))
            },
            addNotification: function(msg) {
                $log.debug("Notification:addNotification");
                var newAlert = {};
                newAlert.type = "success", newAlert.msg = msg, $rootScope.$broadcast("pushAlert", newAlert)
            },
            getNotification: function(action) {
                var notif = !0;
                return "notification" in action && !action.notification && (notif = !1, delete action.notification), notif
            }
        }
    }]), angular.module("linshareAdminApp").directive("lsSidebar", [function() {
        return {
            restrict: "A",
            transclude: !1,
            scope: !1,
            controller: ["_", "$rootScope", "$scope", "$log", "$state", "Authentication", "Tab", "Languages", "$http", function(_, $rootScope, $scope, $log, $state, Authentication, Tab, Languages, $http) {
                var setActiveSection = function(link, value) {
                        $scope.linkActive = link, value.isopen = !0
                    },
                    compareCurrentStateToTab = function(currentState) {
                        angular.forEach($scope.tabs, function(value) {
                            angular.forEach(value.links, function(link) {
                                currentState === link.sref ? setActiveSection(link.sref, value) : link.childrenSref && angular.forEach(link.childrenSref, function(subLink) {
                                    (currentState === link.sref || currentState === subLink) && setActiveSection(link.sref, value)
                                })
                            })
                        })
                    };
                Authentication.getCurrentUser().then(function(user) {
                    $scope.tabs = Tab.getAvailableTabs(user), $scope.linkActive = !1, $scope.userDomain = user.domain, $rootScope.$on("$stateChangeStart", function(event, toState) {
                        compareCurrentStateToTab(toState.name)
                    }), $scope.linkActive === !1 && compareCurrentStateToTab($state.next.name)
                }), Authentication.version().then(function(version) {
                    $scope.coreVersion = version
                }), $scope.productVersion = "dev", $http.get("/about.json").success(function(data) {
                    $scope.productVersion = data.version
                }), $scope.$watch("search", function(newValue) {
                    var inSearch = !_.isEmpty(newValue);
                    angular.forEach($scope.tabs, function(value) {
                        value.isopen = inSearch
                    })
                }), $scope.language = Languages.getCurrentLang().filter
            }],
            templateUrl: "ng_components/common/sidebar.tpl.html",
            replace: !1
        }
    }]), angular.module("linshareAdminApp").factory("Tab", ["_", "$log", "Authentication", "lsAppConfig", function(_, $log, Authentication, lsAppConfig) {
        var domains = {
                name: "COMMON.TAB.DOMAINS",
                icon: "fa-cloud",
                superAdminOnly: !0,
                links: [{
                    name: "COMMON.TAB.LDAP_CONNECTIONS",
                    sref: "ldapconnection.list",
                    childrenSref: ["ldapconnection.detail"]
                }, {
                    name: "COMMON.TAB.DOMAIN_PATTERNS",
                    sref: "domainpattern.list",
                    childrenSref: ["domainpattern.detail"]
                }, {
                    name: "COMMON.TAB.MANAGE_DOMAINS",
                    sref: "domain.detail"
                }, {
                    name: "COMMON.TAB.DOMAIN_ORDER",
                    sref: "domainorder.order"
                }, {
                    name: "COMMON.TAB.DOMAIN_POLICIES",
                    sref: "domainpolicy.list",
                    childrenSref: ["domainpolicy.detail"]
                }, {
                    name: "COMMON.TAB.MANAGE_QUOTA",
                    sref: "quota.detail"
                }, {
                    name: "COMMON.TAB.UPGRADES_TASKS",
                    sref: "upgradetasks.list"
                }]
            },
            mails = {
                name: "COMMON.TAB.MAILS",
                icon: "fa-envelope",
                superAdminOnly: !0,
                links: [{
                    name: "COMMON.TAB.MAIL_LAYOUT",
                    sref: "maillayout.list",
                    childrenSref: ["maillayout.detail"]
                }, {
                    name: "COMMON.TAB.MAIL_FOOTER",
                    sref: "mailfooter.list",
                    childrenSref: ["mailfooter.detail"]
                }, {
                    name: "COMMON.TAB.MAIL_CONTENT",
                    sref: "mailcontent.list",
                    childrenSref: ["mailcontent.detail"]
                }, {
                    name: "COMMON.TAB.MAIL_CONFIG",
                    sref: "mailconfig.list",
                    childrenSref: ["mailconfig.detail"]
                }, {
                    name: "COMMON.TAB.MAIL_ACTIVATION",
                    superAdminOnly: !1,
                    sref: "mailactivation.list",
                    childrenSref: ["mailactivation.detail"]
                }]
            },
            parameters = {
                name: "COMMON.TAB.PARAMETERS",
                icon: "fa-gears",
                superAdminOnly: !1,
                links: [{
                    name: "COMMON.TAB.FUNCTIONALITIES",
                    superAdminOnly: !1,
                    sref: "functionality.list",
                    childrenSref: ["functionality.detail"]
                }, {
                    name: "COMMON.TAB.MIME_POLICIES",
                    superAdminOnly: !0,
                    sref: "mimepolicy.list",
                    childrenSref: ["mimepolicy.detail"]
                }, {
                    name: "COMMON.TAB.WELCOME_MESSAGES",
                    superAdminOnly: !1,
                    sref: "welcomemessage.list",
                    childrenSref: ["welcomemessage.detail"]
                }]
            },
            users = {
                name: "COMMON.TAB.USERS",
                icon: "fa-users",
                superAdminOnly: !1,
                links: [{
                    name: "COMMON.TAB.MANAGE_USERS",
                    superAdminOnly: !1,
                    sref: "user.list",
                    childrenSref: ["user.detail"]
                }, {
                    name: "COMMON.TAB.INCONSISTENT_USERS",
                    superAdminOnly: !0,
                    sref: "inconsistentuser.search",
                    childrenSref: ["inconsistentuser.search.detail", "inconsistentuser.list.all", "inconsistentuser.list.detail"]
                }, {
                    name: "COMMON.TAB.THREADS",
                    superAdminOnly: !0,
                    sref: "thread.list",
                    childrenSref: ["thread.detail"]
                }, {
                    name: "COMMON.TAB.MAILING_LISTS",
                    superAdminOnly: !0,
                    sref: "mailinglist.list",
                    childrenSref: ["mailinglist.detail"]
                }, {
                    name: "COMMON.TAB.TECHNICAL_ACCOUNT",
                    superAdminOnly: !0,
                    sref: "technicalaccount.list",
                    childrenSref: ["technicalaccount.detail"]
                }]
            },
            history = {
                name: "COMMON.TAB.HISTORY",
                icon: "fa-archive",
                superAdminOnly: !1,
                links: [{
                    name: "COMMON.TAB.AUDIT",
                    superAdminOnly: !0,
                    sref: "auditv2"
                }]
            };
        lsAppConfig.auditV1hidden || history.links.push({
            name: "COMMON.TAB.AUDIT_V1",
            superAdminOnly: !1,
            sref: "audit.form"
        }), this.tabs = [parameters, users, history, domains, mails];
        var self = this;
        return {
            getAvailableTabs: function(user) {
                $log.debug("Tab:getAvailableTabs");
                var tabs = self.tabs;
                return Authentication.isSuperAdmin(user) || (tabs = _.filter(tabs, function(container) {
                    return container.superAdminOnly === !1
                }), _.forEach(tabs, function(container) {
                    container.links = _.filter(container.links, function(link) {
                        return link.superAdminOnly === !1
                    })
                })), tabs
            }
        }
    }]), angular.module("linshareAdminApp").filter("truncate", function() {
        return function(text, length, end) {
            return isNaN(length) && (length = 10), void 0 === end && (end = "..."), text.length <= length || text.length - end.length <= length ? text : String(text).substring(0, length - end.length) + end
        }
    }), angular.module("linshareAdminApp").filter("translateSearchFilter", ["_", "$translate", "$filter", function(_, $translate, $filter) {
        return function(input, param) {
            if (!param) return input;
            var searchVal = $filter("lowercase")(param),
                result = [];
            return angular.forEach(input, function(section) {
                angular.forEach(section.links, function(menu) {
                    var translatedSection = $filter("lowercase")($filter("translate")(section.name)),
                        translatedMenu = $filter("lowercase")($filter("translate")(menu.name));
                    (translatedMenu.match(searchVal) || translatedSection.match(searchVal)) && 0 === _.where(result, {
                        name: section.name
                    }).length && result.push(section)
                })
            }), result
        }
    }]), angular.module("linshareAdminApp").directive("lsDoc", ["$rootScope", "$translate", function($rootScope, $translate) {
        var getTemplate = function(identifier) {
                return "/i18n/templates/functionalities/" + $translate.use() + "/" + identifier + ".tpl.html"
            },
            linker = function(scope) {
                scope.isCollapse = !1, scope.contentStatus = "CST_MORE", scope.seeContent = function() {
                    scope.isCollapse = !scope.isCollapse, scope.contentStatus = scope.isCollapse ? "CST_LESS" : "CST_MORE"
                }, scope.template = getTemplate(scope.functionalityDetail.identifier), scope.extendedTemplate = "0";
                var functionality = scope.docType + ".DETAILS." + scope.functionalityDetail.identifier + ".USE_EXTENDED_DESCRIPTION";
                $translate(functionality).then(function(translations) {
                    scope.extendedTemplate = translations
                }), $rootScope.$on("$translateChangeSuccess", function() {
                    scope.template = getTemplate(scope.functionalityDetail.identifier), $translate(functionality).then(function(translations) {
                        scope.extendedTemplate = translations
                    })
                })
            };
        return {
            restrict: "E",
            link: linker,
            scope: {
                functionalityDetail: "=func",
                docType: "=docType"
            },
            templateUrl: "ng_components/common/documentation.tpl.html"
        }
    }]),
    function() {
        function lsLogo(lsAppConfig) {
            function linkFn(scope) {
                scope.lsAppConfig = lsAppConfig, scope.customLogo = !1, !lsAppConfig.license && lsAppConfig.logoURL && (scope.customLogo = !0)
            }
            var directive = {
                restrict: "C",
                templateUrl: "ng_components/common/logo.tpl.html",
                link: linkFn
            };
            return directive
        }
        angular.module("linshareAdminApp").directive("lsLogo", lsLogo), lsLogo.$inject = ["lsAppConfig"]
    }(), angular.module("linshareAdminApp").controller("DashbordCtrl", ["$scope", "$filter", "$log", "authenticatedUser", function($scope, $filter, $log, authenticatedUser) {
        $scope.userDomain = authenticatedUser.domain
    }]), angular.module("linshareAdminApp").factory("Domain", ["_", "$q", "$log", "Notification", "Restangular", function(_, $q, $log, Notification, Restangular) {
        function restangularizeTree(domain, route) {
            Restangular.restangularizeElement(null, domain, route), _.isEmpty(domain.children) || angular.forEach(domain.children, function(child) {
                restangularizeTree(child, route)
            })
        }
        return {
            getDomainTree: function(domainId, parent) {
                return $log.debug("Domain:getDomainTree"), parent = parent || !1, Restangular.all("domains").one(domainId).get({
                    tree: !0,
                    parent: parent
                }).then(function(rootDomain) {
                    restangularizeTree(rootDomain, "domains");
                    var dfd = $q.defer();
                    return dfd.resolve(rootDomain), dfd.promise
                })
            },
            getAll: function() {
                return $log.debug("Domain:getAll"), Restangular.all("domains").getList()
            },
            get: function(id) {
                return $log.debug("Domain:get"), Restangular.one("domains", id).get({
                    tree: !0
                })
            },
            add: function(domain) {
                return $log.debug("Domain:add"), Restangular.all("domains").post(domain).then(function(newDomain) {
                    var deferred = $q.defer();
                    return deferred.resolve(newDomain), Notification.addSuccess("CREATE"), deferred.promise
                })
            },
            update: function(domain, notify) {
                return $log.debug("Domain:update"), notify = "undefined" != typeof notify ? notify : !0, delete domain.children, domain.put().then(function() {
                    notify && Notification.addSuccess("UPDATE")
                })
            },
            remove: function(domain) {
                return $log.debug("Domain:remove"), domain.remove().then(function() {
                    Notification.addSuccess("DELETE")
                })
            },
            createSample: function(parentId, type) {
                var sample = {};
                return sample.parent = parentId, sample.type = type, sample.providers = [], "GUESTDOMAIN" === type && (sample.userRole = "SIMPLE"), sample
            },
            getId: function(domain) {
                return domain.identifier
            }
        }
    }]), angular.module("linshareAdminApp").controller("DomainDetailCtrl", ["_", "$rootScope", "$scope", "$log", "$modal", "$state", "$translate", "Notification", "selectOptions", "currentDomain", "authenticatedUser", "Domain", "DomainPolicy", "_allWelcomeMessages", function(_, $rootScope, $scope, $log, $modal, $state, $translate, Notification, selectOptions, currentDomain, authenticatedUser, Domain, DomainPolicy, _allWelcomeMessages) {
        if (currentDomain) {
            if ($scope.state = $state.params.formState, $scope.ldapConnections = selectOptions.ldapConnectionIds, $scope.domainPolicy = !1, $scope.mailConfigs = selectOptions.mailConfigs, $scope.mimePolicies = selectOptions.mimePolicies, $scope.userRoles = ["SIMPLE", "ADMIN"], $scope.languages = selectOptions.languages, $scope.supportedLanguages = selectOptions.supportedLanguages, $scope.welcomeMessages = _.sortBy(_allWelcomeMessages, function(welcomeMessage) {
                    return angular.lowercase(welcomeMessage.name)
                }), $scope.domainPatterns = selectOptions.domainPatternIds, $scope.domainPolicies = [], angular.forEach(selectOptions.domainPolicies, function(domainPolicy) {
                    this.push({
                        identifier: domainPolicy.identifier,
                        label: domainPolicy.label
                    })
                }, $scope.domainPolicies), "create" === $scope.state) {
                var parentLabel = currentDomain.label;
                currentDomain = Domain.createSample(currentDomain.identifier, $state.params.domainType), $scope.parentDomain = angular.extend({
                    label: parentLabel
                }, currentDomain)
            }
            $scope.domain = currentDomain, $scope.isSuperAdmin = "SUPERADMIN" === authenticatedUser.role, $scope.isRootDomain = "ROOTDOMAIN" === currentDomain.type, $scope.disableProvider = $scope.isRootDomain || 0 !== currentDomain.providers.length
        }
        $scope.addProvider = function() {
            $scope.disableProvider ? $log.error("Try to add more than one provider") : ($scope.domain.providers.push({
                ldapConnectionUuid: "",
                userLdapPatternUuid: "",
                baseDn: ""
            }), $scope.disableProvider = !0)
        }, $scope.deleteProvider = function() {
            $scope.disableProvider ? ($scope.domain.providers.splice(0, 1), $scope.disableProvider = !1) : $log.error("Try to delete an non existing provider")
        };
        var createPolicy = function(label) {
                return $scope.domainPolicy = {
                    notification: !1,
                    label: label,
                    accessPolicy: {
                        rules: [{
                            type: "DENY_ALL"
                        }]
                    }
                }, DomainPolicy.add($scope.domainPolicy)
            },
            addDomainWithPolicy = function(domain) {
                Domain.add(domain).then(function(newDomain) {
                    $scope.domain.identifier = newDomain.identifier, DomainPolicy.get($scope.domain.policy.identifier).then(function(policy) {
                        policy.notification = !1, policy.accessPolicy.rules.unshift({
                            type: "ALLOW",
                            domain: $scope.domain
                        }), DomainPolicy.update(policy).then(function() {
                            $state.go("domain.detail", {
                                domainId: $scope.domain.identifier,
                                formState: "edit"
                            })
                        })
                    }), $state.go("domain.detail", {
                        domainId: $scope.domain.identifier,
                        formState: "edit"
                    })
                })
            };
        $scope.submit = function() {
            "edit" === $scope.state ? Domain.update($scope.domain) : "create" === $scope.state && ("create_new_policy" === $scope.domain.policy.identifier ? createPolicy($scope.domain.label).then(function(newPolicy) {
                delete newPolicy.originalElement, $scope.domain.policy = newPolicy, addDomainWithPolicy($scope.domain)
            }) : addDomainWithPolicy($scope.domain))
        }, $scope.issetDomainPolicy = function(identifier) {
            DomainPolicy.exist(identifier).then(function(res) {
                return res
            })
        }, $scope.remove = function() {
            if ("edit" === $scope.state) {
                var modalInstance = $modal.open({
                    templateUrl: "ng_components/common/confirm_modal.tpl.html",
                    controller: "ConfirmDialogCtrl",
                    resolve: {
                        content: function() {
                            return "MANAGE_DOMAINS.CONFIRM_DELETE_FORM.PARAGRAPH"
                        }
                    }
                });
                modalInstance.result.then(function() {
                    Domain.remove($scope.domain).then(function() {
                        $scope.cancel()
                    })
                }, function() {
                    $log.debug("Deletion modal dismissed")
                })
            } else $log.error("Invalid state")
        }, $scope.reset = function() {
            $state.reinit()
        }, $scope.cancel = function() {
            $state.go("domain.detail", {
                domainId: null,
                formState: null,
                domainType: null
            }, {
                reload: !0
            })
        }
    }]), angular.module("linshareAdminApp").controller("DomainTreeCtrl", ["_", "$scope", "$log", "$state", "treeType", "treeTitle", "rootDomain", "Authentication", function(_, $scope, $log, $state, treeType, treeTitle, rootDomain, Authentication) {
        $scope.root = [rootDomain], $scope.state = treeType, $scope.title = treeTitle, Authentication.getCurrentUser().then(function(user) {
            $scope.adminDomain = user.domain
        });
        var findDeep = function(domain, attrs) {
            var match = function(attrValue, attrs) {
                    return _.forEach(attrs, function(value, key) {
                        return _.isUndefined(attrValue) || attrs[key] === attrValue[key] ? void 0 : !1
                    }), !0
                },
                traverse = function(domain, attrs) {
                    var result;
                    return _.forEach(domain, function(attr) {
                        return attr && match(attr, attrs) ? (result = attr, !1) : ((_.isObject(attr) || _.isArray(attr)) && (result = traverse(attr, attrs)), result ? !1 : void 0)
                    }), result
                };
            return traverse(domain, attrs)
        };
        $scope.isParent = function(domain) {
            return !_.isEmpty(findDeep(domain.children, {
                identifier: $scope.adminDomain
            }))
        }, $scope.hasGuestDomain = function(topDomain) {
            return !_.isEmpty(_.find(topDomain.children, {
                type: "GUESTDOMAIN"
            }))
        }, $scope.canAddChildDomain = function(domain) {
            return "edit" === $scope.state && ("TOPDOMAIN" === domain.type || "ROOTDOMAIN" === domain.type)
        }, $scope.canAddTopDomain = function(domain) {
            return "ROOTDOMAIN" === domain.type
        }, $scope.canAddSubDomain = function(domain) {
            return "TOPDOMAIN" === domain.type
        }, $scope.canAddGuestDomain = function(domain) {
            return "TOPDOMAIN" === domain.type && _.isEmpty(_.find(domain.children, {
                type: "GUESTDOMAIN"
            }))
        }
    }]), angular.module("linshareAdminApp").controller("DomainOrderCtrl", ["$scope", "$filter", "$log", "$translate", "ngTableParams", "Domain", "domains", function($scope, $filter, $log, $translate, ngTableParams, Domain, domains) {
        $scope.getTemplate = function() {
            return "DOMAIN_ORDER"
        }, $scope.swap = function(x, y, data) {
            data[x].authShowOrder = y, data[y].authShowOrder = x, Domain.update(data[x], !1).then(function() {
                Domain.update(data[y]).then(function() {
                    $scope.reloadList()
                })
            })
        }, $scope.reloadList = function() {
            $scope.tableParams.reload()
        }, $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            sorting: {
                authShowOrder: "asc"
            }
        }, {
            debugMode: !1,
            total: 0,
            getData: function($defer, params) {
                var orderedData = params.sorting() ? $filter("orderBy")(domains, params.orderBy()) : domains;
                params.total(orderedData.length), $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()))
            }
        })
    }]), angular.module("linshareAdminApp").factory("DomainPattern", ["$q", "$log", "Restangular", "Notification", function($q, $log, Restangular, Notification) {
        return {
            getAll: function() {
                return $log.debug("DomainPattern:getAll"), Restangular.all("domain_patterns").getList()
            },
            get: function(id) {
                return $log.debug("DomainPattern:get"), Restangular.one("domain_patterns", id).get()
            },
            add: function(domainPattern) {
                return $log.debug("DomainPattern:add"), Restangular.all("domain_patterns").post(domainPattern).then(function() {
                    Notification.addSuccess("CREATE")
                })
            },
            update: function(domainPattern) {
                return $log.debug("DomainPattern:update"), domainPattern.put().then(function() {
                    Notification.addSuccess("UPDATE")
                })
            },
            remove: function(domainPattern) {
                return $log.debug("DomainPattern:remove"), domainPattern.remove().then(function() {
                    Notification.addSuccess("DELETE")
                })
            },
            getAllModels: function() {
                return $log.debug("DomainPattern:getAllModels"), Restangular.all("domain_patterns").all("models").getList()
            },
            copyFromModel: function(model) {
                var copy = Restangular.copy(model);
                return copy.label = "", copy
            },
            getEmptyModel: function() {
                return {
                    label: ""
                }
            }
        }
    }]), angular.module("linshareAdminApp").controller("DomainPatternDetailCtrl", ["$scope", "$state", "$modal", "$log", "DomainPattern", "models", "currentDomainPattern", function($scope, $state, $modal, $log, DomainPattern, models, currentDomainPattern) {
        function loadModel() {
            $scope.domainPattern = DomainPattern.copyFromModel($scope.modelSelector)
        }
        if ($scope.state = $state.params.formState, $scope.domainPattern = currentDomainPattern || {}, "create" === $scope.state) {
            var emptyModel = DomainPattern.getEmptyModel();
            $scope.models = models, $scope.models.push(emptyModel), $scope.modelSelector = emptyModel, $scope.$watch("modelSelector", function() {
                loadModel()
            })
        }
        $scope.submit = function() {
            "edit" === $scope.state ? (DomainPattern.update($scope.domainPattern), $state.go("domainpattern.list")) : "create" === $scope.state ? DomainPattern.add($scope.domainPattern).then(function() {
                $state.go("domainpattern.list")
            }) : $log.error("Invalid state")
        }, $scope.remove = function() {
            if ("edit" === $scope.state) {
                var modalInstance = $modal.open({
                    templateUrl: "ng_components/common/confirm_modal.tpl.html",
                    controller: "ConfirmDialogCtrl",
                    resolve: {
                        content: function() {
                            return "DOMAIN_PATTERNS.CONFIRM_DELETE_FORM.PARAGRAPH"
                        }
                    }
                });
                modalInstance.result.then(function() {
                    DomainPattern.remove($scope.domainPattern).then(function() {
                        $state.go("domainpattern.list")
                    })
                }, function() {
                    $log.debug("Deletion modal dismissed")
                })
            } else $log.error("Invalid state")
        }, $scope.reset = function() {
            $state.reinit()
        }
    }]), angular.module("linshareAdminApp").controller("DomainPatternListCtrl", ["$scope", "$filter", "$log", "$translate", "ngTableParams", "domainPatterns", function($scope, $filter, $log, $translate, ngTableParams, domainPatterns) {
        $scope.getTemplate = function() {
            return "DOMAIN_PATTERN"
        }, $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            sorting: {
                label: "asc"
            }
        }, {
            debugMode: !1,
            total: 0,
            getData: function($defer, params) {
                var orderedData = params.sorting() ? $filter("orderBy")(domainPatterns, params.orderBy()) : domainPatterns;
                params.total(orderedData.length), $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()))
            }
        })
    }]), angular.module("linshareAdminApp").factory("DomainPolicy", ["_", "$rootScope", "$log", "Restangular", "Notification", "$q", function(_, $rootScope, $log, Restangular, Notification, $q) {
        var deferred = $q.defer();
        return {
            getAll: function() {
                return $log.debug("DomainPolicy:getAll"), Restangular.all("domain_policies").getList()
            },
            get: function(id) {
                return $log.debug("DomainPolicy:get"), _.isObject(id) ? Restangular.one("domain_policies", id.id).get().then(function(success) {
                    return success
                }, function(data) {
                    return data.status
                }) : Restangular.one("domain_policies", id).get()
            },
            add: function(domainPolicy) {
                $log.debug("DomainPolicy:add");
                var notification = Notification.getNotification(domainPolicy);
                return Restangular.all("domain_policies").post(domainPolicy).then(function(policy) {
                    notification && Notification.addSuccess("CREATE"), deferred.resolve(policy.plain())
                }), deferred.promise
            },
            update: function(domainPolicy) {
                $log.debug("DomainPolicy:update");
                var notification = Notification.getNotification(domainPolicy);
                return domainPolicy.put().then(function() {
                    notification && Notification.addSuccess("UPDATE")
                })
            },
            exist: function(domainIdentifier) {
                return $log.debug("DomainPolicy:head"), Restangular.one("domain_policies", domainIdentifier).head()
            },
            remove: function(domainPolicy) {
                return $log.debug("DomainPolicy:remove"), domainPolicy.remove().then(function() {
                    Notification.addSuccess("DELETE")
                })
            }
        }
    }]), angular.module("linshareAdminApp").controller("DomainPolicyDetailCtrl", ["$scope", "$filter", "$modal", "$log", "$state", "ngTableParams", "DomainPolicy", "selectOptions", "currentDomainPolicy", function($scope, $filter, $modal, $log, $state, ngTableParams, DomainPolicy, selectOptions, currentDomainPolicy) {
        $scope.allDomains = selectOptions.domains, $scope.allRuleTypes = selectOptions.domainAccessRuleTypes, $scope.state = $state.params.formState, $scope.domainPolicy = currentDomainPolicy || {}, "create" === $scope.state && ($scope.domainPolicy.accessPolicy = {
            rules: []
        }), $scope.submit = function() {
            "edit" === $scope.state ? DomainPolicy.update($scope.domainPolicy) : "create" === $scope.state ? DomainPolicy.add($scope.domainPolicy).then(function() {
                $state.go("domainpolicy.list")
            }) : $log.error("Invalid state")
        }, $scope.remove = function() {
            if ("edit" === $scope.state) {
                var modalInstance = $modal.open({
                    templateUrl: "ng_components/common/confirm_modal.tpl.html",
                    controller: "ConfirmDialogCtrl",
                    resolve: {
                        content: function() {
                            return "DOMAIN_POLICIES.CONFIRM_DELETE_FORM.PARAGRAPH"
                        }
                    }
                });
                modalInstance.result.then(function() {
                    DomainPolicy.remove($scope.domainPolicy).then(function() {
                        $state.go("domainpolicy.list")
                    })
                }, function() {
                    $log.debug("Deletion modal dismissed")
                })
            } else $log.error("Invalid state")
        }, $scope.reset = function() {
            $state.reinit()
        }, $scope.addRule = function(ruleToAdd) {
            ("ALLOW_ALL" === ruleToAdd.type || "DENY_ALL" === ruleToAdd.type) && delete ruleToAdd.domain, $scope.domainPolicy.accessPolicy.rules.push(angular.copy(ruleToAdd)), $scope.reloadList()
        }, $scope.deleteRule = function(index) {
            $scope.domainPolicy.accessPolicy.rules.splice(index, 1), $scope.reloadList()
        }, $scope.swap = function(x, y) {
            var rules = $scope.domainPolicy.accessPolicy.rules;
            y %= rules.length, rules[x] = rules.splice(y, 1, rules[x])[0], $scope.reloadList()
        }, $scope.reloadList = function() {
            $scope.tableParams.reload()
        }, $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10
        }, {
            debugMode: !1,
            total: 0,
            getData: function($defer, params) {
                var orderedData = params.sorting() ? $filter("orderBy")($scope.domainPolicy.accessPolicy.rules, params.orderBy()) : $scope.domainPolicy.accessPolicy.rules;
                params.total(orderedData.length), $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()))
            }
        })
    }]), angular.module("linshareAdminApp").controller("DomainPolicyListCtrl", ["$scope", "$filter", "$log", "ngTableParams", "domainPolicies", function($scope, $filter, $log, ngTableParams, domainPolicies) {
        $scope.getTemplate = function() {
            return "DOMAIN_POLICY"
        }, $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            sorting: {
                identifier: "asc"
            }
        }, {
            debugMode: !1,
            total: 0,
            getData: function($defer, params) {
                var orderedData = params.sorting() ? $filter("orderBy")(domainPolicies, params.orderBy()) : domainPolicies;
                params.total(orderedData.length), $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()))
            }
        })
    }]), angular.module("linshareAdminApp").factory("Functionality", ["$log", "Restangular", function($log, Restangular) {
        return {
            getAll: function(domainId, identifier) {
                return $log.debug("Functionality:getAll"), Restangular.all("functionalities").getList({
                    domainId: domainId,
                    parentId: identifier
                })
            },
            get: function(domainId, funcId) {
                return $log.debug("Functionality:get"), Restangular.one("functionalities", funcId).get({
                    domainId: domainId
                })
            },
            update: function(functionality) {
                return $log.debug("Functionality:update"), functionality.put()
            },
            remove: function(functionality) {
                return $log.debug("Functionality:remove"), functionality.remove()
            }
        }
    }]), angular.module("linshareAdminApp").controller("FunctionalityDetailCtrl", ["_", "$scope", "$state", "$filter", "currentFunctionality", "childrenFunctionality", "listFunctionalities", function(_, $scope, $state, $filter, currentFunctionality, childrenFunctionality, listFunctionalities) {
        $scope.iconSaved = !1, $scope.view = !$state.params.view || "simple" !== $state.params.view && "advanced" !== $state.params.view ? "simple" : $state.params.view, $scope.functionality = currentFunctionality, $scope.childrenFunctionality = childrenFunctionality;
        var functionalities = $filter("orderBy")(listFunctionalities, ["+localizedName"]),
            indexOfFunctionality = _.indexOf(functionalities, currentFunctionality.identifier);
        $scope.nextFunctionalities = functionalities[indexOfFunctionality + 1], $scope.prevFunctionalities = functionalities[indexOfFunctionality - 1]
    }]), angular.module("linshareAdminApp").controller("FunctionalityCtrl", ["$scope", "$state", "$timeout", "$translate", "Functionality", function($scope, $state, $timeout, $translate, Functionality) {
        var timeoutId, setIcon = function(value) {
            null === $scope.functionality.parentIdentifier ? $scope.iconSaved = value : $scope.$parent.$parent.$parent.iconSaved = value
        };
        $scope.displayIconSaved = function() {
            setIcon(!0), $timeout(function() {
                setIcon(!1)
            }, 800)
        }, $scope.showActivation = function() {
            return $scope.functionality.activationPolicy.parentAllowUpdate
        }, $scope.showConfiguration = function() {
            return "FORBIDDEN" !== $scope.functionality.activationPolicy.policy && $scope.functionality.configurationPolicy.parentAllowUpdate
        }, $scope.showDelegation = function() {
            return "FORBIDDEN" !== $scope.functionality.activationPolicy.policy && $scope.functionality.delegationPolicy && $scope.functionality.delegationPolicy.parentAllowUpdate
        }, $scope.showParameters = function() {
            return $scope.functionality.parentAllowParametersUpdate
        }, $scope.showResetToParent = function() {
            return $scope.showParameters() || $scope.showDelegation() || $scope.showConfiguration() || $scope.showActivation()
        }, $scope.disableStatus = function(policyType) {
            return policyType ? "ALLOWED" !== policyType.policy : !1
        }, $scope.isRootDomain = function() {
            return "LinShareRootDomain" === $scope.functionality.domain
        };
        var updateFunctionality = function(functionality) {
            Functionality.update(functionality).then(function() {
                $scope.displayIconSaved()
            })
        };
        $scope.updateWithTimeout = function() {
            angular.isDefined(timeoutId) && $timeout.cancel(timeoutId), timeoutId = $timeout(function() {
                $scope.update(), timeoutId = void 0
            }, 1500)
        };
        var updateStatus = function(policyType) {
            policyType && (policyType.status = "ALLOWED" === policyType.policy ? policyType.status : "MANDATORY" === policyType.policy)
        };
        $scope.update = function() {
            updateStatus($scope.functionality.activationPolicy), updateStatus($scope.functionality.configurationPolicy), updateStatus($scope.functionality.delegationPolicy), updateFunctionality($scope.functionality)
        }, $scope.resetToParent = function() {
            Functionality.get($state.params.domainId, $scope.functionality.identifier).then(function(functionality) {
                Functionality.remove(functionality).then(function() {
                    $state.reinit(), $scope.displayIconSaved()
                })
            })
        }, $scope.checkPolicyType = function(policyType) {
            policyType.status = policyType.defaultStatus
        }, $scope.changeStatusFunctionality = function() {
            $scope.functionality.activationPolicy.policy = "ALLOWED", updateFunctionality($scope.functionality)
        }, $scope.changeDelegationFunctionality = function() {
            $scope.functionality.delegationPolicy.status = $scope.functionality.delegationPolicy.status ? !0 : !1, $scope.functionality.delegationPolicy.policy = "ALLOWED", updateFunctionality($scope.functionality)
        }
    }]), angular.module("linshareAdminApp").directive("lsFunctionalityDisplay", ["$rootScope", "$translate", "$compile", "$http", "$templateCache", function($rootScope, $translate, $compile, $http, $templateCache) {
        var baseURL = "ng_components/functionality/functionality_",
            typeTemplateMapping = {
                simple: "simple.tpl.html",
                advanced: "advanced.tpl.html"
            },
            getTemplate = function(identifier) {
                return "/i18n/templates/functionalities/" + $translate.use() + "/" + identifier + ".tpl.html"
            },
            getIdName = function(functionality, identifier) {
                return "FUNCTIONALITIES.DETAILS." + functionality + identifier
            },
            linker = function(scope, element) {
                scope.isOpen = !1, scope.translations = {
                    DESCRIPTION: "",
                    ACTIVATION_POLICY: "",
                    CONFIGURATION_POLICY: "",
                    PARAMETER_DESCRIPTION: "",
                    DELEGATION_POLICY: "",
                    USE_EXTENDED_DESCRIPTION: ""
                };
                var initTraduction = function() {
                    angular.forEach(scope.translations, function(key, value) {
                        $translate(getIdName(scope.functionality.identifier, "." + value)).then(function(translation) {
                            scope.translations[value] = translation
                        })
                    })
                };
                scope.template = getTemplate(scope.functionality.identifier), initTraduction();
                var functionality = "FUNCTIONALITIES.DETAILS." + scope.functionality.identifier + ".USE_EXTENDED_DESCRIPTION";
                $translate(functionality).then(function(translations) {
                    scope.translationValue = translations
                }), $rootScope.$on("$translateChangeSuccess", function() {
                    scope.template = getTemplate(scope.functionality.identifier), initTraduction()
                });
                var tplURL = baseURL + typeTemplateMapping[scope.view],
                    templateLoader = $http.get(tplURL, {
                        cache: $templateCache
                    }).success(function(html) {
                        element.html(html)
                    }).then(function() {
                        element.replaceWith($compile(element.html())(scope))
                    });
                return function(scope, element) {
                    templateLoader.then(function() {
                        element.html($compile(element.html())(scope))
                    })
                }
            };
        return {
            restrict: "E",
            link: linker,
            controller: "FunctionalityCtrl"
        }
    }]), angular.module("linshareAdminApp").controller("FunctionalityListCtrl", ["_", "$scope", "$filter", "$q", "$translate", "$state", "ngTableParams", "functionalities", "currentDomain", function(_, $scope, $filter, $q, $translate, $state, ngTableParams, functionalities, currentDomain) {
        $scope.domain = currentDomain, $scope.view = $state.params.view, $scope.showFunctionality = function(functionality) {
                return functionality.activationPolicy.parentAllowUpdate || functionality.configurationPolicy.parentAllowUpdate
            }, $scope.isActivated = function(functionality) {
                return functionality.activationPolicy.status
            },
            $scope.localizedName = function() {
                var def = $q.defer(),
                    names = [];
                return def.resolve(names), def
            }, $scope.tableParams = new ngTableParams({
                page: 1,
                count: 50,
                sorting: {
                    localizedName: "asc"
                }
            }, {
                debugMode: !1,
                counts: [],
                total: 0,
                getData: function($defer, params) {
                    var displayableFuncs = _.where(functionalities, {
                            displayable: !0
                        }),
                        nameFilter = params.filter().localizedName,
                        deferred = $q.defer();
                    if (_.isEmpty(nameFilter)) {
                        var orderedData = params.sorting() ? $filter("orderBy")(displayableFuncs, params.orderBy()) : displayableFuncs;
                        params.total(orderedData.length), $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()))
                    } else {
                        var ids = _.pluck(displayableFuncs, "identifier"),
                            localizedNames = _.map(ids, function(id) {
                                return "FUNCTIONALITIES.DETAILS." + id + ".NAME"
                            });
                        $translate(localizedNames).then(function(translations) {
                            deferred.resolve(_.filter(displayableFuncs, function(f) {
                                return -1 !== translations["FUNCTIONALITIES.DETAILS." + f.identifier + ".NAME"].toLowerCase().indexOf(nameFilter.toLowerCase())
                            }))
                        }), deferred.promise.then(function(data) {
                            var orderedData = params.sorting() ? $filter("orderBy")(data, params.orderBy()) : data;
                            params.total(orderedData.length), $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()))
                        })
                    }
                }
            })
    }]), angular.module("linshareAdminApp").factory("WelcomeMessage", ["$q", "$log", "Notification", "Restangular", function($q, $log, Notification, Restangular) {
        return {
            getAll: function(_domainId, parent) {
                return $log.debug("WelcomeMessages:getAll"), parent = parent || !1, Restangular.all("welcome_messages").getList({
                    domainId: _domainId,
                    parent: parent
                })
            },
            get: function(id) {
                return $log.debug("WelcomeMessages:get"), Restangular.one("welcome_messages", id).get({
                    tree: !0
                })
            },
            add: function(welcomeMessage) {
                return $log.debug("WelcomeMessages:add"), Restangular.all("welcome_messages").post(welcomeMessage).then(function(welcomeMessage) {
                    return Notification.addSuccess("CREATE"), welcomeMessage
                })
            },
            update: function(welcomeMessage) {
                return $log.debug("WelcomeMessages:update"), welcomeMessage.put().then(function(welcomeMessage) {
                    return Notification.addSuccess("UPDATE"), welcomeMessage
                })
            },
            remove: function(welcomeMessage) {
                return $log.debug("WelcomeMessages:remove"), welcomeMessage.remove().then(function() {
                    Notification.addSuccess("DELETE")
                })
            }
        }
    }]), angular.module("linshareAdminApp").controller("WelcomeMessageDetailCtrl", ["_", "$log", "$scope", "$state", "$filter", "$modal", "$window", "ngTableParams", "currentWelcomesMessage", "rootDomain", "WelcomeMessage", "authenticatedUser", function(_, $log, $scope, $state, $filter, $modal, $window, ngTableParams, currentWelcomesMessage, rootDomain, WelcomeMessage, authenticatedUser) {
        var bodyHeight = $window.innerHeight - 250;
        $scope.height = bodyHeight > 400 ? bodyHeight : 400, $scope.isOpen = !0, $scope.edit = "show" === $state.params.state ? !0 : !1, $scope.welcomeMessage = currentWelcomesMessage || {};
        var checkLabel = {
            "true": "LABEL_UNSELECT",
            "false": "LABEL_SELECT"
        };
        $scope.check = {
            bool: !1,
            label: checkLabel[!1]
        }, $scope.activeItem = function(domain) {
            return domain.active = !1, angular.forEach($scope.allDomains, function(element) {
                domain.identifier === element && (domain.active = !0)
            }), domain.active
        }, $scope.domainsTree = function(domains) {
            angular.forEach(domains, function(value) {
                this.push({
                    identifier: value.identifier,
                    label: value.label,
                    active: $scope.activeItem(value)
                }), $scope.domainsTree(value.children)
            }, $scope.domains)
        }, $scope.initDomains = function() {
            $scope.allDomains = _.pluck($scope.welcomeMessage.domains, "identifier"), $scope.domains = [], $scope.domains.push({
                identifier: rootDomain.identifier,
                label: rootDomain.label,
                active: $scope.activeItem(rootDomain)
            }), $scope.domainsTree(rootDomain.children)
        }, $scope.initDomains(), $scope.isParent = function() {
            return !_.isEmpty(_.find(rootDomain.children, {
                identifier: $scope.welcomeMessage.myDomain.identifier
            })) || rootDomain.identifier === $scope.welcomeMessage.myDomain.identifier || "ROOTDOMAIN" === rootDomain.type
        }, $scope.changeItem = function(domain) {
            var copy = angular.copy(domain);
            return copy.active ? $scope.welcomeMessage.domains = _.without($scope.welcomeMessage.domains, _.findWhere($scope.welcomeMessage.domains, {
                identifier: copy.identifier
            })) : (delete copy.active, $scope.welcomeMessage.domains.push(copy)), domain.active = !domain.active, domain
        }, $scope.reset = function() {
            $state.reinit()
        }, $scope.selectAll = function() {
            return $scope.check.bool = !$scope.check.bool, $scope.check.label = checkLabel[$scope.check.bool], $scope.welcomeMessage.domains = [], $scope.check.bool ? angular.forEach($scope.domains, function(value) {
                this.push({
                    identifier: value.identifier,
                    label: value.label
                }), value.active = $scope.check.bool
            }, $scope.welcomeMessage.domains) : angular.forEach($scope.domains, function(value) {
                value.active = $scope.check.bool
            })
        }, $scope.add = function() {
            $modal.open({
                controller: "welcomeMessageModalCtrl",
                templateUrl: "ng_components/welcomemessage/welcomemessage_modal.tpl.html",
                resolve: {
                    _welcomeMessage: function() {
                        return $scope.welcomeMessage
                    },
                    _adminDomain: function() {
                        return authenticatedUser.domain
                    },
                    _domain: function() {
                        return null
                    }
                }
            })
        }, $scope.remove = function() {
            var modalInstance = $modal.open({
                templateUrl: "ng_components/common/confirm_modal.tpl.html",
                controller: "ConfirmDialogCtrl",
                resolve: {
                    content: function() {
                        return "WELCOME_MESSAGES.CONFIRM_DELETE_FORM"
                    }
                }
            });
            modalInstance.result.then(function() {
                var domain = $scope.welcomeMessage.myDomain.identifier;
                WelcomeMessage.remove($scope.welcomeMessage).then(function() {
                    $state.go("welcomemessage.list", {
                        domainId: domain
                    })
                })
            }, function() {
                $log.debug("Deletion modal dismissed")
            })
        }, $scope.submit = function() {
            WelcomeMessage.update($scope.welcomeMessage).then(function(welcomeMessage) {
                $scope.welcomeMessage = welcomeMessage, $scope.initDomains(), $scope.tableParams.reload()
            })
        }, $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            sorting: {
                name: "asc"
            }
        }, {
            debugMode: !1,
            total: 0,
            getData: function($defer, params) {
                var filteredData = params.filter() ? $filter("filter")($scope.domains, params.filter()) : $scope.domains,
                    orderedData = params.sorting() ? $filter("orderBy")(filteredData, params.orderBy()) : filteredData;
                params.total(orderedData.length), $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()))
            }
        })
    }]), angular.module("linshareAdminApp").controller("WelcomeMessageListCtrl", ["_", "$state", "$scope", "$filter", "$translate", "$modal", "ngTableParams", "Domain", "WelcomeMessage", "welcomesMessages", "authenticatedUser", "currentDomain", function(_, $state, $scope, $filter, $translate, $modal, ngTableParams, Domain, WelcomeMessage, welcomesMessages, authenticatedUser, currentDomain) {
        $scope.domain = $state.params.domainId, $scope.currentDomain = currentDomain, $scope.user = authenticatedUser, Domain.getAll().then(function(domains) {
            $scope.isMyDomain = _.findWhere(domains, {
                identifier: $scope.domain
            }) ? !0 : !1, $scope._domain = $scope.isMyDomain || "ROOT" === $scope.user.accountType ? Domain.get($scope.domain) : null
        }), $scope.getTemplate = function() {
            return "WELCOME_MESSAGE"
        }, $scope.add = function(welcomeMessage) {
            $modal.open({
                controller: "welcomeMessageModalCtrl",
                templateUrl: "ng_components/welcomemessage/welcomemessage_modal.tpl.html",
                resolve: {
                    _welcomeMessage: function() {
                        return welcomeMessage
                    },
                    _domain: function() {
                        return $scope._domain
                    },
                    _adminDomain: function() {
                        return authenticatedUser.domain
                    }
                }
            })
        }, $scope["new"] = function() {
            $modal.open({
                controller: "welcomeMessageModalCtrl",
                templateUrl: "ng_components/welcomemessage/welcomemessage_modal.tpl.html",
                resolve: {
                    _welcomeMessage: function() {
                        return WelcomeMessage.get("4bc57114-c8c9-11e4-a859-37b5db95d856")
                    },
                    _domain: function() {
                        return $scope._domain
                    },
                    _adminDomain: function() {
                        return null
                    }
                }
            })
        }, $scope["delete"] = function(_welcomeMessage) {
            WelcomeMessage.remove(_welcomeMessage).then(function() {
                $state.reinit()
            })
        }, $scope.getTemplate = function() {
            return "WELCOME_MESSAGE"
        }, $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            sorting: {
                modificationDate: "asc"
            }
        }, {
            debugMode: !1,
            total: 0,
            getData: function($defer, params) {
                var filteredData = params.filter() ? $filter("filter")(welcomesMessages, params.filter()) : welcomesMessages,
                    orderedData = params.sorting() ? $filter("orderBy")(filteredData, params.orderBy()) : filteredData;
                params.total(orderedData.length), $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count())), $scope.isCollapsed = 0 === orderedData.length
            }
        })
    }]), angular.module("linshareAdminApp").controller("welcomeMessageModalCtrl", ["_", "$scope", "$state", "$modalInstance", "$filter", "Domain", "WelcomeMessage", "_welcomeMessage", "_adminDomain", "_domain", function(_, $scope, $state, $modalInstance, $filter, Domain, WelcomeMessage, _welcomeMessage, _adminDomain, _domain) {
        $scope.welcomeMessage = {}, $scope.redirect = !0, $scope.domain = _domain, $scope._adminDomain = _adminDomain, _adminDomain && Domain.getAll().then(function(domains) {
            $scope.domains = domains;
            var findDomain = _.findWhere($scope.domains, {
                identifier: _welcomeMessage.myDomain.identifier
            });
            $scope.domain = findDomain ? findDomain : _.findWhere($scope.domains, {
                identifier: _adminDomain
            })
        }), $scope.isDefined = function(x) {
            return angular.isDefined(x)
        }, $scope.create = function() {
            $scope.welcomeMessage.uuid = _welcomeMessage.uuid, $scope.welcomeMessage.myDomain = {}, $scope.welcomeMessage.myDomain.identifier = $scope.domain.identifier, $scope.welcomeMessage.myDomain.label = $scope.domain.label, WelcomeMessage.add($scope.welcomeMessage).then(function(welcomeMessage) {
                $modalInstance.close(), $scope.reset(), $state.reinit(), $scope.redirect && $state.go("welcomemessage.detail", {
                    id: welcomeMessage.uuid,
                    state: "edit"
                })
            })
        }, $scope.cancel = function() {
            $modalInstance.dismiss("cancel"), $scope.reset()
        }, $scope.reset = function() {
            $scope.welcomeMessage = {}
        }, $scope.reset()
    }]), angular.module("linshareAdminApp").controller("InconsistentUserDetailCtrl", ["$scope", "$modal", "$log", "$state", "User", "allDomains", "currentUser", function($scope, $modal, $log, $state, User, allDomains, currentUser) {
        $scope.allDomains = allDomains, $scope.user = currentUser, $scope["delete"] = function() {
            var modalInstance = $modal.open({
                templateUrl: "ng_components/common/confirm_modal.tpl.html",
                controller: "ConfirmDialogCtrl",
                resolve: {
                    content: function() {
                        return "INCONSISTENT_USERS.CONFIRM_DELETE_FORM.PARAGRAPH"
                    }
                }
            });
            modalInstance.result.then(function() {
                User.remove($scope.user).then(function() {
                    $scope.cancel()
                })
            }, function() {
                $log.debug("Deletion modal dismissed")
            })
        }, $scope.submit = function(user, domain) {
            user.domain = domain, User.update($scope.user).then(function() {
                $scope.cancel()
            })
        }
    }]), angular.module("linshareAdminApp").controller("InconsistentUserAllListCtrl", ["_", "$scope", "$filter", "$log", "ngTableParams", "allInconsistents", "lsAppConfig", "User", "$q", "$modal", function(_, $scope, $filter, $log, ngTableParams, allInconsistents, lsAppConfig, User, $q, $modal) {
        $scope.lsAppConfig = lsAppConfig, $scope.isCollapsed = !1, $scope.getTemplate = function() {
            return "INCONSISTENT_USER"
        }, $scope.totalInconsistents = allInconsistents.length, $scope.getAllInconsistents = function() {
            User.getAllInconsistent().then(function(inconsistents) {
                $scope.allInconsistents = inconsistents
            })
        }, $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            sorting: {
                lastName: "asc"
            }
        }, {
            debugMode: !1,
            total: 0,
            getData: function($defer, params) {
                var orderedData = params.sorting() ? $filter("orderBy")(allInconsistents, params.orderBy()) : allInconsistents;
                orderedData = $filter("filter")(orderedData, params.filter()), params.total(orderedData.length), $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()))
            }
        }), $scope.selectedInconsistent = [], $scope.toggleSelectInconsistent = function(user) {
            if (user.isSelected) $scope.selectedInconsistent.push(user);
            else {
                var index = $scope.selectedInconsistent.indexOf(user);
                index > -1 && $scope.selectedInconsistent.splice(index, 1)
            }
        }, $scope.flagsOnSelectedPages = {}, $scope.selectDocumentsOnCurrentPage = function(data, page, selectFlag) {
            var currentPage = page || $scope.tableParams.page(),
                dataOnPage = data || $scope.tableParams.data,
                select = selectFlag || $scope.flagsOnSelectedPages[currentPage];
            select ? ($scope.selectedInconsistent = _.xor($scope.selectedInconsistent, dataOnPage), angular.forEach(dataOnPage, function(element) {
                element.isSelected && (element.isSelected = !1, _.remove($scope.selectedInconsistent, function(n) {
                    return n.uuid === element.uuid
                }))
            }), $scope.flagsOnSelectedPages[currentPage] = !1) : (angular.forEach(dataOnPage, function(element) {
                element.isSelected || (element.isSelected = !0, $scope.selectedInconsistent.push(element))
            }), $scope.flagsOnSelectedPages[currentPage] = !0)
        };
        var removeElementFromCollection = function(collection, element) {
            var index = collection.indexOf(element);
            index > -1 && collection.splice(index, 1)
        };
        $scope.deleteUsers = function(selectedUsers) {
            var modalInstance = $modal.open({
                templateUrl: "ng_components/common/confirm_modal.tpl.html",
                controller: "ConfirmDialogCtrl",
                resolve: {
                    content: function() {
                        return "INCONSISTENT_USERS.CONFIRM_DELETE_FORM.PARAGRAPH"
                    }
                }
            });
            modalInstance.result.then(function() {
                angular.forEach(selectedUsers, function(user, index) {
                    delete user.isSelected, User.remove(user).then(function() {
                        user.isSelected = !1, removeElementFromCollection(allInconsistents, user), selectedUsers.splice(index, 1), $scope.tableParams.reload()
                    })
                })
            }, function() {
                $log.debug("Deletion modal dismissed")
            })
        }, $scope.changeDomain = function(selectedUsers) {
            var modalInstance = $modal.open({
                templateUrl: "ng_components/user/user_changedomain_modal.tpl.html",
                controller: "ChangeDomainModalCtrl",
                resolve: {
                    allDomains: ["Domain", function(Domain) {
                        return Domain.getAll()
                    }],
                    selectedUsers: function() {
                        return selectedUsers
                    }
                }
            });
            modalInstance.result.then(function() {}, function() {
                $log.debug("Deletion modal dismissed")
            })
        }
    }]), angular.module("linshareAdminApp").controller("InconsistentUserSearchListCtrl", ["$scope", "$state", "User", "$q", "Restangular", "$modal", "$log", function($scope, $state, User, $q, Restangular, $modal, $log) {
        $scope.inconsistent = {}, $scope.getStatus = function(user) {
            $state.go("inconsistentuser.search"), $scope.searchValue = user.mail, User.getInconsistencyStatus(user).then(function(result) {
                $scope.accounts = result, $scope.dataUpTodate = !0
            })
        }, $scope.searchUsersAccount = function(pattern) {
            var defered = $q.defer();
            return $scope.searchValue = pattern, User.autocompleteInconsistent(pattern).then(function(listUsers) {
                defered.resolve(listUsers)
            }), defered.promise
        }, $scope.userRepresentation = function(u) {
            return angular.isString(u) ? u : u.firstName.concat(" ", u.lastName, " ", u.mail, " ", u.domain)
        }, $scope.dataUpTodate = !0;
        var createUserProfile = function(user) {
            var modalInstance = $modal.open({
                templateUrl: "ng_components/common/confirm_modal.tpl.html",
                controller: "ConfirmDialogCtrl",
                resolve: {
                    content: function() {
                        return "MANAGE_USERS.CONFIRM_CREATE_PROFILE_FORM.PARAGRAPH"
                    }
                }
            });
            modalInstance.result.then(function() {
                var userDto = {
                    uuid: user.uuid,
                    mail: user.userMail,
                    domain: user.identifier
                };
                Restangular.all("users").post(userDto).then(function(user) {
                    $scope.dataUpTodate = !1, $state.go("inconsistentuser.search.detail", {
                        uuid: user.uuid
                    })
                })
            }, function() {
                $log.debug("Deletion modal dismissed")
            })
        };
        $scope.showUserDetail = function(user) {
            $scope.currentDetailState = user.uuid, user.database ? $state.go("inconsistentuser.search.detail", {
                uuid: user.uuid
            }) : createUserProfile(user)
        }
    }]), angular.module("linshareAdminApp").factory("LdapConnection", ["$log", "Restangular", "Notification", function($log, Restangular, Notification) {
        return {
            getAll: function() {
                return $log.debug("LdapConnection:getAll"), Restangular.all("ldap_connections").getList()
            },
            get: function(id) {
                return $log.debug("LdapConnection:get"), Restangular.one("ldap_connections", id).get()
            },
            add: function(ldapConnection) {
                return $log.debug("LdapConnection:add"), Restangular.all("ldap_connections").post(ldapConnection).then(function() {
                    Notification.addSuccess("CREATE")
                })
            },
            update: function(ldapConnection) {
                return $log.debug("LdapConnection:update"), ldapConnection.put().then(function() {
                    Notification.addSuccess("UPDATE")
                })
            },
            remove: function(ldapConnection) {
                return $log.debug("LdapConnection:remove"), ldapConnection.remove().then(function() {
                    Notification.addSuccess("DELETE")
                })
            }
        }
    }]), angular.module("linshareAdminApp").controller("LdapConnectionDetailCtrl", ["$scope", "$state", "$modal", "$log", "LdapConnection", "currentLdapConnection", function($scope, $state, $modal, $log, LdapConnection, currentLdapConnection) {
        $scope.state = $state.params.formState, $scope.ldapConnection = currentLdapConnection || {}, $scope.submit = function() {
            "edit" === $scope.state ? (LdapConnection.update($scope.ldapConnection), $state.go("ldapconnection.list")) : "create" === $scope.state ? LdapConnection.add($scope.ldapConnection).then(function() {
                $state.go("ldapconnection.list")
            }) : $log.error("Invalid state")
        }, $scope.remove = function() {
            if ("edit" === $scope.state) {
                var modalInstance = $modal.open({
                    templateUrl: "ng_components/common/confirm_modal.tpl.html",
                    controller: "ConfirmDialogCtrl",
                    resolve: {
                        content: function() {
                            return "DOMAIN_PATTERNS.CONFIRM_DELETE_FORM.PARAGRAPH"
                        }
                    }
                });
                modalInstance.result.then(function() {
                    LdapConnection.remove($scope.ldapConnection).then(function() {
                        $state.go("ldapconnection.list")
                    })
                }, function() {
                    $log.debug("Deletion modal dismissed")
                })
            } else $log.error("Invalid state")
        }, $scope.reset = function() {
            $state.reinit()
        }
    }]), angular.module("linshareAdminApp").controller("LdapConnectionListCtrl", ["$scope", "$filter", "$log", "$translate", "ngTableParams", "ldapConnections", function($scope, $filter, $log, $translate, ngTableParams, ldapConnections) {
        $scope.getTemplate = function() {
            return "LDAP_CONNECTION"
        }, $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            sorting: {
                label: "asc"
            }
        }, {
            debugMode: !1,
            total: 0,
            getData: function($defer, params) {
                var orderedData = params.sorting() ? $filter("orderBy")(ldapConnections, params.orderBy()) : ldapConnections;
                params.total(orderedData.length), $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()))
            }
        })
    }]), angular.module("linshareAdminApp").factory("MailConfig", ["$log", "Notification", "Restangular", function($log, Notification, Restangular) {
        return {
            getAll: function(domainId, onlyCurrentDomain) {
                return $log.debug("MailConfig:getAll"), Restangular.all("mail_configs").getList({
                    domainId: domainId,
                    onlyCurrentDomain: onlyCurrentDomain
                })
            },
            getAllMailContents: function(mailConfigUuid, language, mailContentType) {
                return $log.debug("MailConfig:getAllMailContents"), Restangular.one("mail_configs", mailConfigUuid).getList("mail_contents", {
                    language: language,
                    mailContentType: mailContentType
                })
            },
            getAllMailFooters: function(mailConfigUuid, language) {
                return $log.debug("MailConfig:getAllMailFooters"), Restangular.one("mail_configs", mailConfigUuid).getList("mail_footers", {
                    language: language
                })
            },
            get: function(domainId, mailConfigId) {
                return $log.debug("MailConfig:get"), Restangular.one("mail_configs", mailConfigId).get({
                    domainId: domainId
                })
            },
            add: function(mailConfig) {
                return $log.debug("MailConfig:add"), Restangular.all("mail_configs").post(mailConfig).then(function() {
                    Notification.addSuccess("CREATE")
                })
            },
            update: function(mailConfig) {
                return $log.debug("MailConfig:update"), mailConfig.put().then(function() {
                    Notification.addSuccess("UPDATE")
                })
            },
            remove: function(mailConfig) {
                return $log.debug("MailConfig:remove"), mailConfig.remove().then(function() {
                    Notification.addSuccess("DELETE")
                })
            }
        }
    }]), angular.module("linshareAdminApp").controller("MailConfigDetailCtrl", ["_", "$filter", "$log", "$modal", "$scope", "$state", "$translate", "currentDomain", "currentMailConfig", "MailConfig", "MailFooterLang", "mailFooterLangs", "mailLayouts", "ngTableParams", "Notification", function(_, $filter, $log, $modal, $scope, $state, $translate, currentDomain, currentMailConfig, MailConfig, MailFooterLang, mailFooterLangs, mailLayouts, ngTableParams, Notification) {
        function addMailContentTypeTranslation() {
            _.forEach($scope.mailConfig.mailContentLangs, function(mailContentLang) {
                $translate("COMMON.ENUM.MAIL_CONTENT_TYPE." + mailContentLang.mailContentType).then(function(data) {
                    mailContentLang.mailContentTypeTranslated = data
                })["catch"](function() {
                    mailContentLang.mailContentTypeTranslated = ""
                })
            })
        }

        function copy() {
            var copyText;
            $translate("MAIL_FOOTER.BOX_FORM.TEXT_COPY").then(function(data) {
                copyText = data + " ";
                var modalScope = $scope.$new();
                modalScope.mailConfig = {}, modalScope.mailConfig.name = copyText + $scope.mailConfig.name, modalScope.domainUuid = currentDomain.identifier, modalScope.modelUuid = currentMailConfig.uuid, $modal.open({
                    controller: "mailConfigModalCtrl",
                    templateUrl: "ng_components/mailconfig/mailconfig_modal.tpl.html",
                    scope: modalScope
                })
            })["catch"](function(error) {
                Notification.addError(error)
            })
        }

        function removeMailContentTypeTranslation() {
            _.forEach($scope.mailConfig.mailContentLangs, function(mailContentLang) {
                delete mailContentLang.mailContentTypeTranslated
            })
        }
        $scope.domain = currentDomain, $scope.mailConfig = currentMailConfig, $scope.mailLayouts = mailLayouts, $scope.mailFooterLangs = mailFooterLangs, $scope.copy = copy, $scope.remove = function() {
            var modalInstance = $modal.open({
                templateUrl: "ng_components/common/confirm_modal.tpl.html",
                controller: "ConfirmDialogCtrl",
                resolve: {
                    content: function() {
                        return "MAIL_CONFIG.CONFIRM_DELETE_FORM.PARAGRAPH"
                    }
                }
            });
            modalInstance.result.then(function() {
                removeMailContentTypeTranslation(), MailConfig.remove($scope.mailConfig).then(function() {
                    $state.go("mailconfig.list", {
                        domainId: $scope.domain.label
                    })
                })
            }, function() {
                $log.debug("Deletion modal dismissed")
            })
        }, $scope.update = function(redirect) {
            removeMailContentTypeTranslation(), MailConfig.update($scope.mailConfig).then(function() {
                redirect && $state.go("mailconfig.list", {
                    domainId: $scope.domain.label
                })
            })
        }, $scope.reset = function() {
            $state.reinit()
        }, $scope.editMailContentLang = function(mailContentLang) {
            $state.go("mailconfig.detail", {
                domainId: $state.params.domainId,
                contentLangId: mailContentLang.uuid
            })
        }, $scope.updateMailFooterLang = function(mailFooterLang) {
            MailFooterLang.update(mailFooterLang)
        }, $scope.tableFooterParams = new ngTableParams({
            page: 1,
            count: 10,
            sorting: {
                language: "asc"
            }
        }, {
            debugMode: !1,
            total: 0,
            getData: function($defer, params) {
                var orderedData = params.sorting() ? $filter("orderBy")(_.values($scope.mailConfig.mailFooterLangs), params.orderBy()) : _.values($scope.mailConfig.mailFooterLangs);
                orderedData = params.filter ? $filter("filter")(orderedData, params.filter()) : orderedData, params.total(orderedData.length), $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()))
            }
        }), addMailContentTypeTranslation(), $scope.tableContentParams = new ngTableParams({
            page: 1,
            count: 10,
            sorting: {
                mailContentType: "asc"
            }
        }, {
            debugMode: !1,
            total: 0,
            getData: function($defer, params) {
                var orderedData = params.sorting() ? $filter("orderBy")($scope.mailConfig.mailContentLangs, params.orderBy()) : $scope.mailConfig.mailContentLangs;
                orderedData = params.filter ? $filter("filter")(orderedData, params.filter()) : orderedData, params.total(orderedData.length), $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()))
            }
        })
    }]), angular.module("linshareAdminApp").controller("MailConfigListCtrl", ["$scope", "$state", "$filter", "$log", "$modal", "$translate", "ngTableParams", "MailConfig", "mailConfigs", "currentDomain", function($scope, $state, $filter, $log, $modal, $translate, ngTableParams, MailConfig, mailConfigs, currentDomain) {
        $scope.domain = currentDomain, $scope.getTemplate = function() {
            return "MAIL_CONFIG"
        }, $scope["delete"] = function(_mailConfig) {
            MailConfig.remove(_mailConfig).then(function() {
                $state.reinit()
            })
        }, $scope.add = function() {
            $modal.open({
                controller: "mailConfigModalCtrl",
                templateUrl: "ng_components/mailconfig/mailconfig_modal.tpl.html"
            })
        }, $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            sorting: {
                name: "asc"
            }
        }, {
            debugMode: !1,
            total: 0,
            getData: function($defer, params) {
                var orderedData = params.sorting() ? $filter("orderBy")(mailConfigs, params.orderBy()) : mailConfigs;
                orderedData = params.filter ? $filter("filter")(orderedData, params.filter()) : orderedData, params.total(orderedData.length), $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()))
            }
        })
    }]), angular.module("linshareAdminApp").controller("mailConfigModalCtrl", ["_", "$modalInstance", "$log", "$scope", "$state", "Domain", "MailConfig", function(_, $modalInstance, $log, $scope, $state, Domain, MailConfig) {
        Domain.getAll().then(function(domains) {
            $scope.domains = domains, _.isUndefined($scope.domainUuid) || ($scope.domain = _.find($scope.domains, function(domain) {
                return domain.identifier === $scope.domainUuid
            }))
        }), $scope.isDefined = function(x) {
            return !_.isUndefined(x)
        }, $scope.reloadModels = function() {
            angular.isDefined($scope.domain) && MailConfig.getAll($scope.domain.identifier, !1).then(function(models) {
                $scope.models = models, _.isUndefined($scope.modelUuid) || ($scope.model = _.find($scope.models, function(model) {
                    return model.uuid === $scope.modelUuid
                }))
            })
        }, $scope.create = function(model) {
            var originalModel = model.originalElement;
            delete originalModel.name, angular.extend($scope.mailConfig, originalModel), delete $scope.mailConfig.uuid, delete $scope.mailConfig.creationDate, delete $scope.mailConfig.modificationDate, $scope.mailConfig.domain = $scope.domain.identifier, MailConfig.add($scope.mailConfig).then(function() {
                $modalInstance.close(), $scope.reset(), $state.reinit()
            })
        }, $scope.cancel = function() {
            $modalInstance.dismiss("cancel"), $scope.reset()
        }, $scope.reset = function() {
            $scope.mailConfig = {}
        }, _.isUndefined($scope.domain) || $scope.reloadModels()
    }]),
    function() {
        function mailContentRestService($log, Notification, Restangular) {
            function add(mailContent) {
                return $log.debug("mailContentRestService:add"), Restangular.all(restUrl).post(mailContent).then(function() {
                    Notification.addSuccess("CREATE")
                })
            }

            function build(mailContentId, lang, context) {
                return $log.debug("mailContentRestService:build"), Restangular.all(restUrl).one(mailContentId, restParam.build).get({
                    language: lang,
                    flavor: context
                })
            }

            function buildLive(mailContentDto, lang, context) {
                return $log.debug("mailContentRestService:buildLive"), Restangular.all(restUrl + "/" + restParam.build).post(mailContentDto, {
                    language: lang,
                    flavor: context
                })
            }

            function get(domainId, mailContentId) {
                return $log.debug("mailContentRestService:get"), Restangular.one(restUrl, mailContentId).get({
                    domainId: domainId
                })
            }

            function getAll(domainId, onlyCurrentDomain) {
                return $log.debug("mailContentRestService:getAll"), Restangular.all(restUrl).getList({
                    domainId: domainId,
                    onlyCurrentDomain: onlyCurrentDomain
                })
            }

            function getContexts(mailContentId) {
                return $log.debug("mailContentRestService:getContexts"), Restangular.all(restUrl).one(mailContentId, restParam.vars).get()
            }

            function remove(mailContent) {
                return $log.debug("mailContentRestService:remove"), mailContent.remove().then(function() {
                    Notification.addSuccess("DELETE")
                })
            }

            function update(mailContent) {
                return $log.debug("mailContentRestService:update"), mailContent.put().then(function() {
                    Notification.addSuccess("UPDATE")
                })
            }
            var restUrl = "mail_contents",
                restParam = {
                    build: "build",
                    vars: "vars"
                },
                service = {
                    add: add,
                    build: build,
                    buildLive: buildLive,
                    get: get,
                    getAll: getAll,
                    getContexts: getContexts,
                    remove: remove,
                    update: update
                };
            return service
        }
        angular.module("linshareAdminApp").factory("mailContentRestService", mailContentRestService), mailContentRestService.$inject = ["$log", "Notification", "Restangular"]
    }(),
    function() {
        function MailContentDetailCtrl(_, $log, $modal, $sce, $scope, $state, $translate, currentDomain, currentMailContent, mailConfigs, mailContentRestService, mailLanguage, Notification) {
            function activate() {
                mailContentRestService.getContexts($scope.mailContent.uuid).then(function(data) {
                    _.forEach(data, function(contentVar, index) {
                        contentVar.index = index
                    }), $scope.mailContentContext = data, $scope.mailContentContextSelected = $scope.mailContentContext[0]
                }), $scope.mailConfigSelected = mailConfigs[0]
            }

            function capitalize(text) {
                return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase()
            }

            function copy() {
                var copyText;
                $translate("MAIL_CONTENT.BOX_FORM.TEXT_COPY").then(function(data) {
                    copyText = data + " ";
                    var modalScope = $scope.$new();
                    modalScope.mailContent = {}, modalScope.mailContent.description = copyText + $scope.mailContent.description, modalScope.domainUuid = currentDomain.identifier, modalScope.mailContentType = currentMailContent.mailContentType, modalScope.modelUuid = currentMailContent.uuid;
                    var modalInstance = $modal.open({
                        controller: "mailContentModalCtrl",
                        templateUrl: "ng_components/mailcontent/mailcontent_modal.tpl.html",
                        scope: modalScope
                    });
                    modalInstance.result.then(function() {})["catch"](function() {})
                })["catch"](function(error) {
                    Notification.addError(error)
                })
            }

            function remove() {
                var modalInstance = $modal.open({
                    templateUrl: "ng_components/common/confirm_modal.tpl.html",
                    controller: "ConfirmDialogCtrl",
                    resolve: {
                        content: function() {
                            return "MAIL_CONTENT.CONFIRM_DELETE_FORM.PARAGRAPH"
                        }
                    }
                });
                modalInstance.result.then(function() {
                    mailContentRestService.remove($scope.mailContent).then(function() {
                        $state.go("mailcontent.list", {
                            domainId: $scope.domain.label
                        })
                    })
                }, function() {
                    $log.debug("Deletion modal dismissed")
                })
            }

            function render(live, lang) {
                var fnCall = live ? mailContentRestService.buildLive($scope.mailContent, lang, $scope.mailContentContextSelected.index) : mailContentRestService.build($scope.mailContent.uuid, lang, $scope.mailContentContextSelected.index);
                fnCall.then(function(data) {
                    $scope.mailRendered.data = data, $scope.mailRendered.lang = lang, $scope.mailRendered.processed = $sce.trustAsHtml(data.content)
                })
            }

            function reset() {
                $state.reinit()
            }

            function selectConfig(value) {
                $scope.mailConfigSelected = value
            }

            function selectContext(value) {
                $scope.mailContentContextSelected = value
            }

            function update() {
                mailContentRestService.update($scope.mailContent)
            }
            $scope.capitalize = capitalize, $scope.copy = copy, $scope.domain = currentDomain, $scope.mailConfigs = mailConfigs, $scope.mailContent = currentMailContent, $scope.mailContentContextSelected = void 0, $scope.mailConfigSelected = void 0, $scope.mailLanguage = mailLanguage, $scope.mailRendered = {
                data: void 0,
                lang: void 0,
                processed: void 0
            }, $scope.remove = remove, $scope.render = render, $scope.renderShow = {}, $scope.reset = reset, $scope.selectConfig = selectConfig, $scope.selectContext = selectContext, $scope.update = update, activate()
        }
        angular.module("linshareAdminApp").controller("MailContentDetailCtrl", MailContentDetailCtrl), MailContentDetailCtrl.$injet = ["_", "$log", "$modal", "$sce", "$scope", "$state", "$translate", "currentDomain", "currentMailContent", "mailConfigs", "mailContentRestService", "mailLanguage", "Notification"], MailContentDetailCtrl.$inject = ["_", "$log", "$modal", "$sce", "$scope", "$state", "$translate", "currentDomain", "currentMailContent", "mailConfigs", "mailContentRestService", "mailLanguage", "Notification"]
    }(), angular.module("linshareAdminApp").controller("MailContentListCtrl", ["$scope", "$filter", "$modal", "$state", "ngTableParams", "mailContentRestService", "mailContents", "currentDomain", function($scope, $filter, $modal, $state, ngTableParams, mailContentRestService, mailContents, currentDomain) {
        $scope.domain = currentDomain, $scope.getTemplate = function() {
            return "MAIL_CONTENT"
        }, $scope["delete"] = function(_mailContent) {
            mailContentRestService.remove(_mailContent).then(function() {
                $state.reinit()
            })
        }, $scope.add = function() {
            $modal.open({
                controller: "mailContentModalCtrl",
                templateUrl: "ng_components/mailcontent/mailcontent_modal.tpl.html"
            })
        }, $scope.tableParams = new ngTableParams({
            page: 1,
            count: 100,
            sorting: {
                mailContentType: "asc"
            }
        }, {
            debugMode: !1,
            total: 0,
            getData: function($defer, params) {
                var orderedData = params.sorting() ? $filter("orderBy")(mailContents, params.orderBy()) : mailContents;
                orderedData = params.filter ? $filter("filter")(orderedData, params.filter()) : orderedData, params.total(orderedData.length), $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()))
            }
        })
    }]), angular.module("linshareAdminApp").controller("mailContentModalCtrl", ["_", "$scope", "$log", "$translate", "$state", "$modalInstance", "Domain", "Enum", "mailContentRestService", function(_, $scope, $log, $translate, $state, $modalInstance, Domain, Enum, mailContentRestService) {
        Enum.getOptions("mail_content_type").then(function(options) {
            $scope.mailContentTypes = options
        }), Domain.getAll().then(function(domains) {
            $scope.domains = domains, _.isUndefined($scope.domainUuid) || ($scope.domain = _.find($scope.domains, function(domain) {
                return domain.identifier === $scope.domainUuid
            }))
        }), $scope.isDefined = function(x) {
            return !_.isUndefined(x)
        }, $scope.reloadModels = function() {
            _.isUndefined($scope.domain) || _.isUndefined($scope.mailContentType) || mailContentRestService.getAll(Domain.getId($scope.domain), !1).then(function(models) {
                $scope.models = models, _.isUndefined($scope.modelUuid) || ($scope.model = _.find($scope.models, function(model) {
                    return model.uuid === $scope.modelUuid
                }))
            })
        }, $scope.create = function(model) {
            var originalModel = model.originalElement;
            delete originalModel.description, angular.extend($scope.mailContent, originalModel), delete $scope.mailContent.uuid, delete $scope.mailContent.creationDate,
                delete $scope.mailContent.modificationDate, $scope.mailContent.domain = $scope.domain.identifier, mailContentRestService.add($scope.mailContent).then(function() {
                    $modalInstance.close(), $scope.reset(), $state.reinit()
                })
        }, $scope.cancel = function() {
            $modalInstance.dismiss("cancel"), $scope.reset()
        }, $scope.reset = function() {
            $scope.mailContent = {}
        }, _.isUndefined($scope.mailContentType) || $scope.reloadModels()
    }]), angular.module("linshareAdminApp").factory("MailContentLang", ["$log", "Notification", "Restangular", function($log, Notification, Restangular) {
        return {
            get: function(mailContentLangId) {
                return $log.debug("MailContenLang:get"), Restangular.one("mail_content_langs", mailContentLangId).get()
            },
            update: function(mailContentLang) {
                return $log.debug("MailContentLang:update"), mailContentLang.put().then(function() {
                    Notification.addSuccess("UPDATE")
                })
            }
        }
    }]), angular.module("linshareAdminApp").controller("MailContentLangDetailCtrl", ["$scope", "$log", "$modal", "$state", "MailContentLang", "currentMailContentLang", "mailContents", function($scope, $log, $modal, $state, MailContentLang, currentMailContentLang, mailContents) {
        $scope.mailContentLang = currentMailContentLang, $scope.mailContents = mailContents, $scope.update = function() {
            MailContentLang.update($scope.mailContentLang).then(function() {
                $scope.cancel()
            })
        }, $scope.reset = function() {
            $state.reinit()
        }, $scope.cancel = function() {
            $state.go("mailconfig.detail", {
                id: $state.params.mailConfigId,
                language: $scope.mailContentLang.language,
                domainId: $state.params.domainId
            })
        }
    }]), angular.module("linshareAdminApp").factory("MailFooter", ["$log", "Notification", "Restangular", function($log, Notification, Restangular) {
        return {
            getAll: function(domainId, onlyCurrentDomain) {
                return $log.debug("MailFooter:getAll"), Restangular.all("mail_footers").getList({
                    domainId: domainId,
                    onlyCurrentDomain: onlyCurrentDomain
                })
            },
            get: function(domainId, mailFooterId) {
                return $log.debug("MailFooter:get"), Restangular.one("mail_footers", mailFooterId).get({
                    domainId: domainId
                })
            },
            add: function(mailFooter) {
                return $log.debug("MailFooter:add"), Restangular.all("mail_footers").post(mailFooter).then(function() {
                    Notification.addSuccess("CREATE")
                })
            },
            update: function(mailFooter) {
                return $log.debug("MailFooter:update"), mailFooter.put().then(function() {
                    Notification.addSuccess("UPDATE")
                })
            },
            remove: function(mailFooter) {
                return $log.debug("MailFooter:remove"), mailFooter.remove().then(function() {
                    Notification.addSuccess("DELETE")
                })
            }
        }
    }]), angular.module("linshareAdminApp").controller("MailFooterDetailCtrl", ["$log", "$modal", "$scope", "$state", "$translate", "currentDomain", "currentMailFooter", "MailFooter", "Notification", function($log, $modal, $scope, $state, $translate, currentDomain, currentMailFooter, MailFooter, Notification) {
        function copy() {
            var copyText;
            $translate("MAIL_FOOTER.BOX_FORM.TEXT_COPY").then(function(data) {
                copyText = data + " ";
                var modalScope = $scope.$new();
                modalScope.mailFooter = {}, modalScope.mailFooter.description = copyText + $scope.mailFooter.description, modalScope.domainUuid = currentDomain.identifier, modalScope.modelUuid = currentMailFooter.uuid;
                var modalInstance = $modal.open({
                    controller: "mailFooterModalCtrl",
                    templateUrl: "ng_components/mailfooter/mailfooter_modal.tpl.html",
                    scope: modalScope
                });
                modalInstance.result.then(function() {})["catch"](function() {})
            })["catch"](function(error) {
                Notification.addError(error)
            })
        }
        $scope.mailFooter = currentMailFooter, $scope.domain = currentDomain, $scope.copy = copy, $scope.remove = function() {
            var modalInstance = $modal.open({
                templateUrl: "ng_components/common/confirm_modal.tpl.html",
                controller: "ConfirmDialogCtrl",
                resolve: {
                    content: function() {
                        return "MAIL_FOOTER.CONFIRM_DELETE_FORM.PARAGRAPH"
                    }
                }
            });
            modalInstance.result.then(function() {
                MailFooter.remove($scope.mailFooter).then(function() {
                    $state.go("mailfooter.list", {
                        domainId: $scope.domain.label
                    })
                })
            }, function() {
                $log.debug("Deletion modal dismissed")
            })
        }, $scope.update = function() {
            MailFooter.update($scope.mailFooter)
        }, $scope.reset = function() {
            $state.reinit()
        }
    }]), angular.module("linshareAdminApp").controller("MailFooterListCtrl", ["$filter", "$log", "$modal", "$scope", "$state", "$translate", "currentDomain", "ngTableParams", "MailFooter", "mailFooters", function($filter, $log, $modal, $scope, $state, $translate, currentDomain, ngTableParams, MailFooter, mailFooters) {
        $scope.domain = currentDomain, $scope.getTemplate = function() {
            return "MAIL_FOOTER"
        }, $scope.add = function() {
            $modal.open({
                controller: "mailFooterModalCtrl",
                templateUrl: "ng_components/mailfooter/mailfooter_modal.tpl.html"
            })
        }, $scope["delete"] = function(_mailFooter) {
            MailFooter.remove(_mailFooter).then(function() {
                $state.reinit()
            })
        }, $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            sorting: {
                description: "asc"
            }
        }, {
            debugMode: !1,
            total: 0,
            getData: function($defer, params) {
                var orderedData = params.sorting() ? $filter("orderBy")(mailFooters, params.orderBy()) : mailFooters;
                orderedData = params.filter ? $filter("filter")(orderedData, params.filter()) : orderedData, params.total(orderedData.length), $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()))
            }
        })
    }]), angular.module("linshareAdminApp").controller("mailFooterModalCtrl", ["_", "$modalInstance", "$log", "$scope", "$state", "Domain", "MailFooter", function(_, $modalInstance, $log, $scope, $state, Domain, MailFooter) {
        Domain.getAll().then(function(domains) {
            $scope.domains = domains, _.isUndefined($scope.domainUuid) || ($scope.domain = _.find($scope.domains, {
                identifier: $scope.domainUuid
            }))
        }), $scope.isDefined = function(x) {
            return !_.isUndefined(x)
        }, $scope.reloadModels = function() {
            _.isUndefined($scope.domain) || MailFooter.getAll($scope.domain.identifier, !1).then(function(models) {
                $scope.models = models, _.isUndefined($scope.modelUuid) || ($scope.model = _.find($scope.models, {
                    uuid: $scope.modelUuid
                }))
            })
        }, $scope.create = function(model) {
            var originalModel = model.originalElement;
            delete originalModel.description, _.extend($scope.mailFooter, originalModel), delete $scope.mailFooter.uuid, delete $scope.mailFooter.creationDate, delete $scope.mailFooter.modificationDate, $scope.mailFooter.domain = $scope.domain.identifier, MailFooter.add($scope.mailFooter).then(function() {
                $modalInstance.close(), $scope.reset(), $state.reinit()
            })
        }, $scope.cancel = function() {
            $modalInstance.dismiss("cancel"), $scope.reset()
        }, $scope.reset = function() {
            $scope.mailFooter = {}
        }, _.isUndefined($scope.domain) || $scope.reloadModels()
    }]), angular.module("linshareAdminApp").factory("MailFooterLang", ["$log", "Notification", "Restangular", function($log, Notification, Restangular) {
        return {
            get: function(mailFooterLangId) {
                return $log.debug("MailContenLang:get"), Restangular.one("mail_footer_langs", mailFooterLangId).get()
            },
            update: function(mailFooterLang) {
                return $log.debug("MailFooterLang:update"), Restangular.all("mail_footer_langs").customPUT(mailFooterLang).then(function() {
                    Notification.addSuccess("UPDATE")
                })
            }
        }
    }]),
    function() {
        function MailFooterLangDetailCtrl($log, $modal, $scope, $state, currentMailFooterLang, MailFooterLang, mailFooters) {
            function cancel() {
                $state.go("mailconfig.detail", {
                    id: $state.params.mailConfigId,
                    language: $scope.mailFooterLang.language,
                    domainId: $state.params.domainId
                })
            }

            function reset() {
                $state.reinit()
            }

            function update() {
                MailFooterLang.update($scope.mailFooterLang).then(function() {
                    $scope.cancel()
                })
            }
            $scope.cancel = cancel, $scope.mailFooterLang = currentMailFooterLang, $scope.mailFooters = mailFooters, $scope.reset = reset, $scope.update = update
        }
        angular.module("linshareAdminApp").controller("MailFooterLangDetailCtrl", MailFooterLangDetailCtrl), MailFooterLangDetailCtrl.$inject = ["$log", "$modal", "$scope", "$state", "currentMailFooterLang", "MailFooterLang", "mailFooters"]
    }(), angular.module("linshareAdminApp").factory("MailingList", ["$log", "Restangular", "Notification", function($log, Restangular, Notification) {
        return {
            getAll: function() {
                return $log.debug("MailingList:getAll"), Restangular.all("lists").getList()
            },
            get: function(mailId) {
                return $log.debug("MailingList:get"), Restangular.one("lists", mailId).get()
            },
            update: function(mail) {
                return $log.debug("MailingList:update"), mail.put().then(function() {
                    Notification.addSuccess("UPDATE")
                })
            },
            remove: function(mail) {
                return $log.debug("MailingList:remove"), mail.remove().then(function() {
                    Notification.addSuccess("DELETE")
                })
            },
            addContact: function(mailId, contact) {
                return $log.debug("MailingList:addContact"), Restangular.one("lists", mailId).all("contacts").customPOST(contact)
            },
            removeContact: function(mailId, contact) {
                return $log.debug("MailingList:removeContact"), Restangular.one("lists", mailId).all("contacts").customOperation("remove", "", {}, {}, contact)
            }
        }
    }]), angular.module("linshareAdminApp").controller("MailingListDetailCtrl", ["$scope", "$filter", "$log", "$state", "ngTableParams", "MailingList", "User", "currentMailingList", function($scope, $filter, $log, $state, ngTableParams, MailingList, User, currentMailingList) {
        $scope.mail = currentMailingList, $scope.remove = function() {
            MailingList.remove($scope.mail).then(function() {
                $scope.cancel()
            })
        }, $scope.reset = function() {
            $state.reinit()
        }, $scope.submit = function(mail) {
            MailingList.update(mail).then(function() {
                $scope.cancel()
            })
        }, $scope.autocompleteUsers = function(pattern) {
            return User.autocomplete(pattern).then(function(users) {
                return angular.forEach($scope.tableParams.data, function(contact) {
                    angular.forEach(users, function(user, key) {
                        user.firstName === contact.firstName && user.lastName === contact.lastName && user.mail === contact.mail && users.splice(key, 1)
                    })
                }), users
            })
        }, $scope.fieldForm = function(contactToAdd) {
            $scope.autocompleteValue = contactToAdd.mail, $scope.contactToAdd = contactToAdd
        }, $scope.addContact = function() {
            var contact = {
                mail: $scope.autocompleteValue,
                firstName: $scope.contactToAdd.firstName,
                lastName: $scope.contactToAdd.lastName
            };
            MailingList.addContact($scope.mail.uuid, contact).then(function() {
                $scope.reloadList(), $scope.contactToAdd = void 0, $scope.autocompleteValue = void 0
            })
        }, $scope.deleteContact = function(contact) {
            MailingList.removeContact($scope.mail.uuid, contact).then(function() {
                $scope.reloadList()
            })
        }, $scope.reloadList = function() {
            $scope.tableParams.reload()
        }, $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            sorting: {
                firstName: "asc"
            }
        }, {
            debugMode: !1,
            total: 0,
            getData: function($defer, params) {
                MailingList.get($scope.mail.uuid).then(function(mail) {
                    var orderedData = params.sorting() ? $filter("orderBy")(mail.contacts, params.orderBy()) : mail.contacts;
                    params.total(orderedData.length), $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()))
                })
            }
        })
    }]), angular.module("linshareAdminApp").controller("MailingListListCtrl", ["$scope", "$filter", "$log", "ngTableParams", "mailingLists", function($scope, $filter, $log, ngTableParams, mailingLists) {
        $scope.isCollapsed = !0, $scope.getTemplate = function() {
            return "MAILINGLIST"
        }, $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            sorting: {
                identifier: "asc"
            }
        }, {
            debugMode: !1,
            total: 0,
            getData: function($defer, params) {
                var orderedData = params.sorting() ? $filter("orderBy")(mailingLists, params.orderBy()) : mailingLists;
                params.total(orderedData.length), $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()))
            }
        })
    }]), angular.module("linshareAdminApp").factory("MailLayout", ["$log", "Notification", "Restangular", function($log, Notification, Restangular) {
        return {
            getAll: function(domainId, onlyCurrentDomain) {
                return $log.debug("MailLayout:getAll"), Restangular.all("mail_layouts").getList({
                    domainId: domainId,
                    onlyCurrentDomain: onlyCurrentDomain
                })
            },
            get: function(domainId, mailLayoutId) {
                return $log.debug("MailLayout:get"), Restangular.one("mail_layouts", mailLayoutId).get({
                    domainId: domainId
                })
            },
            add: function(mailLayout) {
                return $log.debug("MailLayout:add"), Restangular.all("mail_layouts").post(mailLayout).then(function() {
                    Notification.addSuccess("CREATE")
                })
            },
            update: function(mailLayout) {
                return $log.debug("MailLayout:update"), mailLayout.put().then(function() {
                    Notification.addSuccess("UPDATE")
                })
            },
            remove: function(mailLayout) {
                return $log.debug("MailLayout:remove"), mailLayout.remove().then(function() {
                    Notification.addSuccess("DELETE")
                })
            }
        }
    }]), angular.module("linshareAdminApp").controller("MailLayoutDetailCtrl", ["$log", "$modal", "$scope", "$state", "$translate", "currentDomain", "currentMailLayout", "MailLayout", "Notification", function($log, $modal, $scope, $state, $translate, currentDomain, currentMailLayout, MailLayout, Notification) {
        function copy() {
            var copyText;
            $translate("MAIL_LAYOUT.BOX_FORM.TEXT_COPY").then(function(data) {
                copyText = data + " ";
                var modalScope = $scope.$new();
                modalScope.mailLayout = {}, modalScope.mailLayout.description = copyText + $scope.mailLayout.description, modalScope.domainUuid = currentDomain.identifier, modalScope.modelUuid = currentMailLayout.uuid;
                var modalInstance = $modal.open({
                    controller: "mailLayoutModalCtrl",
                    templateUrl: "ng_components/maillayout/maillayout_modal.tpl.html",
                    scope: modalScope
                });
                modalInstance.result.then(function() {})["catch"](function() {})
            })["catch"](function(error) {
                Notification.addError(error)
            })
        }
        $scope.mailLayout = currentMailLayout, $scope.domain = currentDomain, $scope.copy = copy, $scope.remove = function() {
            var modalInstance = $modal.open({
                templateUrl: "ng_components/common/confirm_modal.tpl.html",
                controller: "ConfirmDialogCtrl",
                resolve: {
                    content: function() {
                        return "MAIL_LAYOUT.CONFIRM_DELETE_FORM.PARAGRAPH"
                    }
                }
            });
            modalInstance.result.then(function() {
                MailLayout.remove($scope.mailLayout).then(function() {
                    $state.go("maillayout.list", {
                        domainId: $scope.domain.label
                    })
                })
            }, function() {
                $log.debug("Deletion modal dismissed")
            })
        }, $scope.update = function() {
            MailLayout.update($scope.mailLayout)
        }, $scope.reset = function() {
            $state.reinit()
        }
    }]), angular.module("linshareAdminApp").controller("MailLayoutListCtrl", ["$scope", "$state", "$filter", "$log", "$modal", "$translate", "ngTableParams", "MailLayout", "mailLayouts", "currentDomain", function($scope, $state, $filter, $log, $modal, $translate, ngTableParams, MailLayout, mailLayouts, currentDomain) {
        $scope.domain = currentDomain, $scope.getTemplate = function() {
            return "MAIL_LAYOUT"
        }, $scope.add = function() {
            $modal.open({
                controller: "mailLayoutModalCtrl",
                templateUrl: "ng_components/maillayout/maillayout_modal.tpl.html"
            })
        }, $scope["delete"] = function(_mailLayout) {
            MailLayout.remove(_mailLayout).then(function() {
                $state.reinit()
            })
        }, $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            sorting: {
                description: "asc"
            }
        }, {
            debugMode: !1,
            total: 0,
            getData: function($defer, params) {
                var orderedData = params.sorting() ? $filter("orderBy")(mailLayouts, params.orderBy()) : mailLayouts;
                orderedData = params.filter ? $filter("filter")(orderedData, params.filter()) : orderedData, params.total(orderedData.length), $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()))
            }
        })
    }]), angular.module("linshareAdminApp").controller("mailLayoutModalCtrl", ["_", "$scope", "$log", "$state", "$modalInstance", "Domain", "MailLayout", function(_, $scope, $log, $state, $modalInstance, Domain, MailLayout) {
        Domain.getAll().then(function(domains) {
            $scope.domains = domains, _.isUndefined($scope.domainUuid) || ($scope.domain = _.find($scope.domains, {
                identifier: $scope.domainUuid
            }))
        }), $scope.isDefined = function(x) {
            return !_.isUndefined(x)
        }, $scope.reloadModels = function() {
            _.isUndefined($scope.domain) || MailLayout.getAll(Domain.getId($scope.domain), !1).then(function(models) {
                $scope.models = models, _.isUndefined($scope.modelUuid) || ($scope.model = _.find($scope.models, {
                    uuid: $scope.modelUuid
                }))
            })
        }, $scope.create = function(model) {
            var originalModel = model.originalElement;
            delete originalModel.description, angular.extend($scope.mailLayout, originalModel), delete $scope.mailLayout.uuid, delete $scope.mailLayout.creationDate, delete $scope.mailLayout.modificationDate, $scope.mailLayout.domain = $scope.domain.identifier, MailLayout.add($scope.mailLayout).then(function() {
                $modalInstance.close(), $scope.reset(), $state.reinit()
            })
        }, $scope.cancel = function() {
            $modalInstance.dismiss("cancel"), $scope.reset()
        }, $scope.reset = function() {
            $scope.mailLayout = {}
        }, _.isUndefined($scope.domain) || $scope.reloadModels()
    }]), angular.module("linshareAdminApp").factory("MimePolicy", ["$log", "Notification", "Restangular", function($log, Notification, Restangular) {
        return {
            getAll: function(domainId, onlyCurrentDomain) {
                return $log.debug("MimePolicy:getAll"), Restangular.all("mime_policies").getList({
                    domainId: domainId,
                    onlyCurrentDomain: onlyCurrentDomain
                })
            },
            get: function(mimePolicyId, full) {
                return $log.debug("MimePolicy:get"), Restangular.one("mime_policies", mimePolicyId).get({
                    full: full
                })
            },
            add: function(mimePolicy) {
                return $log.debug("MimePolicy:add"), Restangular.all("mime_policies").post(mimePolicy).then(function() {
                    Notification.addSuccess("CREATE")
                })
            },
            update: function(mimePolicy) {
                return $log.debug("MimePolicy:update"), mimePolicy.put().then(function() {
                    Notification.addSuccess("UPDATE")
                })
            },
            enableAllMimeTypes: function(mimePolicyId) {
                return $log.debug("MimePolicy:enableAllMimeTypes"), Restangular.one("mime_policies", mimePolicyId).customPUT(null, "enable_all")
            },
            disableAllMimeTypes: function(mimePolicyId) {
                return $log.debug("MimePolicy:disableAllMimeTypes"), Restangular.one("mime_policies", mimePolicyId).customPUT(null, "disable_all")
            },
            remove: function(mimePolicy) {
                return $log.debug("MimePolicy:remove"), mimePolicy.remove().then(function() {
                    Notification.addSuccess("DELETE")
                })
            }
        }
    }]), angular.module("linshareAdminApp").controller("MimePolicyDetailCtrl", ["$scope", "$filter", "$timeout", "$log", "$modal", "$state", "ngTableParams", "MimePolicy", "MimeType", "currentMimePolicy", "currentDomain", function($scope, $filter, $timeout, $log, $modal, $state, ngTableParams, MimePolicy, MimeType, currentMimePolicy, currentDomain) {
        $scope.mimePolicy = currentMimePolicy, $scope.iconSaved = !1, $scope.domain = currentDomain, $scope.remove = function() {
            var modalInstance = $modal.open({
                templateUrl: "ng_components/common/confirm_modal.tpl.html",
                controller: "ConfirmDialogCtrl",
                resolve: {
                    content: function() {
                        return "MIME_POLICIES.CONFIRM_DELETE_FORM.PARAGRAPH"
                    }
                }
            });
            modalInstance.result.then(function() {
                MimePolicy.remove($scope.mimePolicy).then(function() {
                    $state.go("mimepolicy.list")
                })
            }, function() {
                $log.debug("Deletion modal dismissed")
            })
        }, $scope.displayIconSaved = function() {
            $scope.iconSaved = !0, $timeout(function() {
                $scope.iconSaved = !1
            }, 800)
        }, $scope.update = function() {
            MimePolicy.update($scope.mimePolicy)
        }, $scope.updateMimeType = function(mimeType) {
            MimeType.update(mimeType).then(function() {
                $scope.displayIconSaved()
            })
        }, $scope.enableAllMimeTypes = function(mimeConfig) {
            MimePolicy.enableAllMimeTypes(mimeConfig.uuid).then(function() {
                $scope.displayIconSaved(), $scope.reset()
            })
        }, $scope.disableAllMimeTypes = function(mimeConfig) {
            MimePolicy.disableAllMimeTypes(mimeConfig.uuid).then(function() {
                $scope.displayIconSaved(), $scope.reset()
            })
        }, $scope.reset = function() {
            $state.reinit()
        }, $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            sorting: {
                enable: "asc"
            }
        }, {
            debugMode: !1,
            total: 0,
            getData: function($defer, params) {
                var filteredData = params.filter() ? $filter("filter")($scope.mimePolicy.mimeTypes, params.filter()) : $scope.mimePolicy.mimeTypes,
                    orderedData = params.sorting() ? $filter("orderBy")(filteredData, params.orderBy()) : filteredData;
                params.total(orderedData.length), $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()))
            },
            $scope: {
                $data: {},
                $emit: function() {}
            }
        })
    }]), angular.module("linshareAdminApp").controller("MimePolicyListCtrl", ["$scope", "$filter", "$log", "$modal", "$translate", "ngTableParams", "currentDomain", "mimePolicies", function($scope, $filter, $log, $modal, $translate, ngTableParams, currentDomain, mimePolicies) {
        $scope.domain = currentDomain, $scope.getTemplate = function() {
            return "MIME_TYPE"
        }, $scope.add = function() {
            var modalInstance = $modal.open({
                controller: "mimePolicyModalCtrl",
                templateUrl: "ng_components/mimepolicy/mimepolicy_modal.tpl.html"
            });
            modalInstance.result.then(function() {
                $scope.tableParams.reload()
            })
        }, $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            sorting: {
                name: "asc"
            }
        }, {
            debugMode: !1,
            total: 0,
            getData: function($defer, params) {
                var filteredData = params.filter() ? $filter("filter")(mimePolicies, params.filter()) : mimePolicies,
                    orderedData = params.sorting() ? $filter("orderBy")(filteredData, params.orderBy()) : filteredData;
                params.total(orderedData.length), $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count())), $scope.isCollapsed = 0 === orderedData.length
            }
        })
    }]), angular.module("linshareAdminApp").controller("mimePolicyModalCtrl", ["$scope", "$log", "$state", "$modalInstance", "MimePolicy", function($scope, $log, $state, $modalInstance, MimePolicy) {
        $scope.create = function() {
            MimePolicy.add($scope.mimePolicy).then(function() {
                $modalInstance.close(), $state.reinit()
            })
        }, $scope.cancel = function() {
            $modalInstance.dismiss("cancel"), $scope.reset()
        }, $scope.reset = function() {
            $scope.mimePolicy = {
                domainId: $state.params.domainId
            }
        }, $scope.reset()
    }]), angular.module("linshareAdminApp").controller("PasswordCtrl", ["$scope", "$location", "$log", "Authentication", "Password", function($scope, $location, $log, Authentication, Password) {
        $scope.newPwdRetyped = "", $scope.password = {
            oldPwd: "",
            newPwd: ""
        }, $scope.match = function(a, b) {
            return Password.match(a, b)
        }, $scope.strengthScore = function(password) {
            return Password.strengthScore(password)
        }, $scope.redirectToHome = function() {
            $location.path("/")
        }, $scope.submit = function() {
            Authentication.changePassword($scope.password).then(function() {
                $location.path("/")
            })
        }
    }]), angular.module("linshareAdminApp").service("Password", function() {
        function Rule(description, validator) {
            this.description = description, this.validator = function(pwd) {
                return validator(pwd)
            }
        }
        this.rules = [new Rule("Contain a symbol", function(pwd) {
            return pwd && /[$-/:-?{-~!"^_`\[\]]/g.test(pwd)
        }), new Rule("Length longer than 8 char", function(pwd) {
            return pwd && pwd.length >= 8
        }), new Rule("Contain a digit", function(pwd) {
            return pwd && /[0-9]+/.test(pwd)
        }), new Rule("Contain an upper case character", function(pwd) {
            return pwd && /[A-Z]+/.test(pwd)
        }), new Rule("Contain a lower case character", function(pwd) {
            return pwd && /[a-z]+/.test(pwd)
        })];
        var self = this;
        return {
            strengthScore: function(password) {
                var strength = 0;
                return angular.forEach(self.rules, function(r) {
                    strength += r.validator(password)
                }), 100 * strength / self.rules.length
            },
            match: function(a, b) {
                return a === b
            }
        }
    }),
    function() {
        function QuotaDetailController(_, $filter, $q, $scope, $timeout, authenticatedUser, domainDto, domainQuotaDto, graphService, Notification, parentDomainQuotaDto, parentContainersQuotaDto, quotaGraphService, quotaRestService, quotaUtilsService, unitService) {
            function activate() {
                quotaVm.unit.value = _.map(unitService.units, function(unit) {
                    return unit.value
                }), quotaVm.isGraphReady = !1, initDto(domainQuotaDto), quotaVm.isRootDomain(quotaVm.domainQuotaDto) || (setModelGetSet(quotaVm.parentDomainQuotaDto), _.forEach(quotaVm.parentContainersQuotaDto, function(container) {
                    setModelGetSet(container)
                })), $q.all(_.map(quotaVm.domainQuotaDto.containerUuids, function(containerUuid) {
                    return quotaRestService.getContainer(containerUuid).then(function(containerData) {
                        initDto(containerData)
                    })
                })).then(function() {
                    quotaVm.graph = buildGraph(), quotaVm.isGraphReady = !0
                })
            }

            function buildGraph() {
                var graph = {},
                    quotaDto = {
                        domain: quotaVm.domainQuotaDto,
                        user: quotaVm.userQuotaDto,
                        workgroup: quotaVm.workgroupQuotaDto,
                        parentDomain: quotaUtilsService.isRootDomain(domainQuotaDto) ? quotaVm.domainQuotaDto : quotaVm.parentDomainQuotaDto,
                        parentUser: quotaUtilsService.isRootDomain(domainQuotaDto) ? quotaVm.userQuotaDto : quotaVm.parentContainersQuotaDto.user,
                        parentWorkgroup: quotaUtilsService.isRootDomain(domainQuotaDto) ? quotaVm.workgroupQuotaDto : quotaVm.parentContainersQuotaDto.workgroup
                    };
                return graph.domain = quotaGraphService.buildGraphDomain(quotaDto), graph.personalSpace = quotaGraphService.buildGraphContainer(quotaDto, "PERSONAL_SPACE"), graph.sharedSpace = quotaGraphService.buildGraphContainer(quotaDto, "SHARED_SPACE"), graph.domainContainers = quotaGraphService.buildGraphDomainContainers(quotaDto), quotaVm.hasSubdomain(quotaDto.domain) && (graph.subdomain = quotaGraphService.buildGraphDomainContainers(quotaDto, !0)), graph
            }

            function buildGraphUpdate(type) {
                var quotaDto = {
                    domain: quotaVm.domainQuotaDto,
                    user: quotaVm.userQuotaDto,
                    workgroup: quotaVm.workgroupQuotaDto,
                    parentDomain: quotaUtilsService.isRootDomain(domainQuotaDto) ? quotaVm.domainQuotaDto : quotaVm.parentDomainQuotaDto,
                    parentUser: quotaUtilsService.isRootDomain(domainQuotaDto) ? quotaVm.userQuotaDto : quotaVm.parentContainersQuotaDto.user,
                    parentWorkgroup: quotaUtilsService.isRootDomain(domainQuotaDto) ? quotaVm.workgroupQuotaDto : quotaVm.parentContainersQuotaDto.workgroup
                };
                switch (type) {
                    case "user":
                        quotaVm.graph.personalSpace = quotaGraphService.buildGraphContainer(quotaDto, "PERSONAL_SPACE");
                        break;
                    case "workgroup":
                        quotaVm.graph.sharedSpace = quotaGraphService.buildGraphContainer(quotaDto, "SHARED_SPACE");
                        break;
                    default:
                        quotaVm.graph = buildGraph()
                }
                _.contains(["user", "workgroup"], type) && (quotaVm.graph.domainContainers = quotaGraphService.buildGraphDomainContainers(quotaDto), quotaVm.hasSubdomain(quotaDto.domain) && (quotaVm.graph.subdomain = quotaGraphService.buildGraphDomainContainers(quotaDto, !0)))
            }

            function getTemplate() {
                return "QUOTA_DETAILS"
            }

            function initDto(data) {
                switch (data.route) {
                    case "domains":
                        quotaVm.domainQuotaDto = data, quotaVm.domainQuotaDto._parent = quotaVm.parentDomainQuotaDto, quotaVm.cloned.domainQuotaDto = _.cloneDeep(data), quotaVm.cloned.unit = _.cloneDeep(quotaVm.unit), setModelGetSet(quotaVm.domainQuotaDto);
                        break;
                    case "containers":
                        switch (data.type) {
                            case "USER":
                                quotaVm.userQuotaDto = data, quotaVm.userQuotaDto._parent = quotaVm.parentContainersQuotaDto ? quotaVm.parentContainersQuotaDto.user : null, quotaVm.cloned.userQuotaDto = _.cloneDeep(data), quotaVm.cloned.unit.user = _.cloneDeep(quotaVm.unit.user), setModelGetSet(quotaVm.userQuotaDto);
                                break;
                            case "WORK_GROUP":
                                quotaVm.workgroupQuotaDto = data, quotaVm.workgroupQuotaDto._parent = quotaVm.parentContainersQuotaDto ? quotaVm.parentContainersQuotaDto.workgroup : null, quotaVm.cloned.workgroupQuotaDto = _.cloneDeep(data), quotaVm.cloned.unit.workgroup = _.cloneDeep(quotaVm.unit.workgroup), setModelGetSet(quotaVm.workgroupQuotaDto)
                        }
                }
            }

            function isInputDisabled(linked, isDomainSharedActivated) {
                return !linked && isDomainSharedActivated ? !0 : quotaVm.isRootDomain(quotaVm.domainQuotaDto) && !isDomainSharedActivated ? !1 : linked
            }

            function manageOverride(form, element, parent, property) {
                quotaUtilsService.manageOverride(element, parent, property), quotaVm.formRender(form).then(function(form) {
                    form.$invalid || buildGraphUpdate(element.type ? element.type : element.route)
                })
            }

            function reset(form) {
                quotaVm.domainQuotaDto = _.cloneDeep(quotaVm.cloned.domainQuotaDto), quotaVm.domainQuotaDto._parent = quotaVm.parentDomainQuotaDto, quotaVm.userQuotaDto = _.cloneDeep(quotaVm.cloned.userQuotaDto), quotaVm.userQuotaDto._parent = quotaVm.parentContainersQuotaDto ? quotaVm.parentContainersQuotaDto.user : null, quotaVm.workgroupQuotaDto = _.cloneDeep(quotaVm.cloned.workgroupQuotaDto), quotaVm.workgroupQuotaDto._parent = quotaVm.parentContainersQuotaDto ? quotaVm.parentContainersQuotaDto.workgroup : null, quotaVm.unit = _.cloneDeep(quotaVm.cloned.unit), setModelGetSet(quotaVm.domainQuotaDto), setModelGetSet(quotaVm.userQuotaDto), setModelGetSet(quotaVm.workgroupQuotaDto), quotaVm.formRender(form).then(function() {
                    quotaVm.graph = buildGraph()
                })
            }

            function setModelGetSet(data) {
                var keyName = _.find(Object.keys(quotaVm.unit), function(key) {
                    return key === data.route ? !0 : data.type ? data.type.toLowerCase().replace("_", "") === key : ""
                });
                _.forEach(Object.keys(quotaVm.unit[keyName]), function(propertyKey) {
                    quotaVm.unit[keyName][propertyKey] = _.isUndefined(data[propertyKey]) || null === data[propertyKey] ? "GB" : quotaVm.unitService.find(data[propertyKey]), data["get" + quotaVm.capitalize(propertyKey)] = function(withUnit) {
                        return withUnit = withUnit || !1, $filter("readableSize")(data[propertyKey], quotaVm.unit[keyName][propertyKey], withUnit)
                    }, data["set" + quotaVm.capitalize(propertyKey)] = function(newValue, form) {
                        data[propertyKey] = quotaVm.unitService.toByte(newValue, quotaVm.unit[keyName][propertyKey]), data["get" + quotaVm.capitalize(propertyKey)] = function(withUnit) {
                            return withUnit = withUnit || !1, $filter("readableSize")(data[propertyKey], quotaVm.unit[keyName][propertyKey], withUnit)
                        }, quotaVm.formRender(form), data.getDefaultQuota && (data.isInWarning = data.getQuota() > data.getDefaultQuota())
                    }, data.updateGraph = function(form) {
                        quotaVm.formRender(form).then(function(form) {
                            form.$invalid || buildGraphUpdate(keyName)
                        })
                    }
                }), data.isExceeded = function() {
                    var initDto = _.find(quotaVm.cloned, function(dto) {
                        return dto.uuid === data.uuid
                    });
                    return initDto.usedSpace >= initDto.quota
                }, _.has(data, "quota") && _.has(data, "usedSpace") && (data.remaining = data.quota - (data.usedSpace + _.has(data, "currentValueForSubdomains") ? data.currentValueForSubdomains : 0), data.getRemaining = function(withUnit) {
                    withUnit = withUnit || !1, data.remaining = data.quota, data.remaining -= _.has(data, "currentValueForSubdomains") ? data.usedSpace + data.currentValueForSubdomains : data.usedSpace;
                    var unit = quotaVm.unitService.find(data.remaining);
                    return $filter("readableSize")(data.remaining, unit, withUnit)
                }), _.has(data, "quota") && (data.unallocated = domainQuotaDto.quota - data.quota, data._parent && (data.unallocated = data._parent.defaultQuota > domainQuotaDto.quota ? data._parent.defaultQuota - data.quota : data.unallocated), data.getUnallocated = function(withUnit) {
                    withUnit = withUnit || !1, data.unallocated = domainQuotaDto.quota - data.quota, data._parent && (data.unallocated = data._parent.defaultQuota > domainQuotaDto.quota ? data._parent.defaultQuota - data.quota : data.unallocated);
                    var unit = quotaVm.unitService.find(data.unallocated);
                    return $filter("readableSize")(data.unallocated, unit, withUnit)
                })
            }

            function setParentDefault(form) {
                quotaVm.setMatchingProperties(quotaVm.domainQuotaDto, "Override", !1), quotaVm.setMatchingProperties(quotaVm.userQuotaDto, "Override", !1), quotaVm.setMatchingProperties(quotaVm.workgroupQuotaDto, "Override", !1), quotaVm.domainQuotaDto.quota = quotaVm.parentDomainQuotaDto.defaultQuota, quotaVm.userQuotaDto.quota = quotaVm.parentContainersQuotaDto.user.defaultQuota, quotaVm.userQuotaDto.accountQuota = quotaVm.parentContainersQuotaDto.user.defaultAccountQuota, quotaVm.userQuotaDto.maxFileSize = quotaVm.parentContainersQuotaDto.user.defaultMaxFileSize, quotaVm.workgroupQuotaDto.quota = quotaVm.parentContainersQuotaDto.workgroup.defaultQuota, quotaVm.workgroupQuotaDto.maxFileSize = quotaVm.parentContainersQuotaDto.workgroup.defaultMaxFileSize, quotaVm.update(form)
            }

            function update(form) {
                var elementToOmit = ["_parent", "isInWarning", "remaining", "unallocated"];
                quotaRestService.updateDomain(_.omit(quotaVm.domainQuotaDto, elementToOmit)).then(function(domainData) {
                    return initDto(domainData), $q.all([quotaRestService.updateContainer(_.omit(quotaVm.userQuotaDto, elementToOmit)), quotaRestService.updateContainer(_.omit(quotaVm.workgroupQuotaDto, elementToOmit))])
                }).then(function(containersData) {
                    Notification.addNotification("MANAGE_QUOTA.NOTIFICATION.UPDATE"), _.forEach(containersData, function(containerData) {
                        initDto(containerData), quotaVm.formRender(form)
                    })
                })["catch"](function(error) {
                    Notification.addError(error)
                })["finally"](function() {
                    quotaVm.graph = buildGraph()
                })
            }
            var quotaVm = this;
            quotaVm.cloned = {}, quotaVm.capitalize = quotaUtilsService.capitalize, quotaVm.domainDto = domainDto, quotaVm.formRender = quotaUtilsService.formRender, quotaVm.getPercentage = quotaUtilsService.getPercentage, quotaVm.getTemplate = getTemplate, quotaVm.hasSubdomain = quotaUtilsService.hasSubdomain, quotaVm.isInputDisabled = isInputDisabled, quotaVm.isRootDomain = quotaUtilsService.isRootDomain, quotaVm.manageOverride = manageOverride, quotaVm.parentContainersQuotaDto = parentContainersQuotaDto, quotaVm.parentDomainQuotaDto = parentDomainQuotaDto, quotaVm.reset = reset, quotaVm.setParentDefault = setParentDefault, quotaVm.setMatchingProperties = quotaUtilsService.setMatchingProperties, quotaVm.unit = quotaUtilsService.unit, quotaVm.unitService = unitService, quotaVm.update = update, activate()
        }
        angular.module("linshareAdminApp").controller("QuotaDetailController", QuotaDetailController), QuotaDetailController.$inject = ["_", "$filter", "$q", "$scope", "$timeout", "authenticatedUser", "domainDto", "domainQuotaDto", "graphService", "Notification", "parentDomainQuotaDto", "parentContainersQuotaDto", "quotaGraphService", "quotaRestService", "quotaUtilsService", "unitService"]
    }(),
    function() {
        function DomainQuotaTreeController(_, $log, $scope, $state, Authentication, domainsQuota, rootDomain, treeTitle, treeType) {
            function activate() {
                Authentication.getCurrentUser().then(function(user) {
                    $scope.adminDomain = user.domain
                }), $scope.domainsIdQuotaError = getDomainIdInError()
            }

            function getDomainIdInError() {
                return _.map($scope.domainsQuota, function(domainQuota) {
                    return domainQuota.usedSpace >= domainQuota.quota ? domainQuota.domain.identifier : void 0
                })
            }

            function findDeep(domain, attrs) {
                var match = function(attrValue, attrs) {
                        return _.forEach(attrs, function(value, key) {
                            return _.isUndefined(attrValue) || attrs[key] === attrValue[key] ? void 0 : !1
                        }), !0
                    },
                    traverse = function(domain, attrs) {
                        var result;
                        return _.forEach(domain, function(attr) {
                            return attr && match(attr, attrs) ? (result = attr, !1) : ((_.isObject(attr) || _.isArray(attr)) && (result = traverse(attr, attrs)), result ? !1 : void 0)
                        }), result
                    };
                return traverse(domain, attrs)
            }

            function hasGuestDomain(topDomain) {
                return !_.isEmpty(_.find(topDomain.children, {
                    type: "GUESTDOMAIN"
                }))
            }

            function isDomainQuotaInError(domain) {
                return _.isUndefined(domain) || _.isUndefined($scope.domainsIdQuotaError) ? void 0 : _.include($scope.domainsIdQuotaError, domain.identifier)
            }

            function isParent(domain) {
                return !_.isEmpty(findDeep(domain.children, {
                    identifier: $scope.adminDomain
                }))
            }
            $scope.domainsQuota = domainsQuota, $scope.hasGuestDomain = hasGuestDomain, $scope.isDomainQuotaInError = isDomainQuotaInError, $scope.isParent = isParent, $scope.root = [rootDomain], $scope.state = treeType, $scope.title = treeTitle, activate()
        }
        angular.module("linshareAdminApp").controller("DomainQuotaTreeController", DomainQuotaTreeController), DomainQuotaTreeController.$inject = ["_", "$log", "$scope", "$state", "Authentication", "domainsQuota", "rootDomain", "treeTitle", "treeType"]
    }(),
    function() {
        function quotaGraphService(_, $filter, graphService, quotaUtilsService, unitService) {
            function buildGraphDomain(quotaDto) {
                var domainQuotaDto = quotaDto.domain,
                    parentDomainQuotaDto = quotaDto.parentDomain,
                    workgroupQuotaDto = quotaDto.workgroup,
                    userQuotaDto = quotaDto.user;
                return {
                    colors: [graphService.colors.blue, graphService.colors.grey],
                    ruler: {
                        max: {
                            display: quotaUtilsService.isRootDomain(domainQuotaDto) ? domainQuotaDto.getQuota(!0) : parentDomainQuotaDto.getDefaultQuota(!0),
                            real: quotaUtilsService.isRootDomain(domainQuotaDto) ? domainQuotaDto.quota : parentDomainQuotaDto.defaultQuota
                        },
                        disabled: quotaUtilsService.isRootDomain(domainQuotaDto)
                    },
                    containers: [{
                        legend: "MANAGE_QUOTA.BOX_FORM.GRAPH.LEGEND.SPACE.DOMAIN",
                        label: "MANAGE_QUOTA.BOX_FORM.GRAPH.LEGEND.QUOTA.DOMAIN",
                        value: {
                            display: domainQuotaDto.getUsedSpace(!0),
                            real: domainQuotaDto.usedSpace
                        },
                        areas: [{
                            tooltip: "MANAGE_QUOTA.BOX_FORM.GRAPH.TOOLTIP.USED.PERSONAL_SPACE",
                            label: "MANAGE_QUOTA.BOX_FORM.GRAPH.LEGEND.SMALL.PERSONAL_SPACE",
                            value: {
                                display: userQuotaDto.getUsedSpace(!0),
                                real: userQuotaDto.usedSpace
                            }
                        }, {
                            tooltip: "MANAGE_QUOTA.BOX_FORM.GRAPH.TOOLTIP.USED.SHARED_SPACE",
                            label: "MANAGE_QUOTA.BOX_FORM.GRAPH.LEGEND.SMALL.SHARED_SPACE",
                            value: {
                                display: workgroupQuotaDto.getUsedSpace(!0),
                                real: workgroupQuotaDto.usedSpace
                            }
                        }],
                        footer: !0
                    }, {
                        colors: {
                            border: graphService.colors.blue
                        },
                        legend: "MANAGE_QUOTA.BOX_FORM.GRAPH.LEGEND.SPACE.SUBDOMAIN",
                        value: {
                            display: domainQuotaDto.getCurrentValueForSubdomains(!0),
                            real: domainQuotaDto.currentValueForSubdomains
                        },
                        footer: !0,
                        disabled: !quotaUtilsService.hasSubdomain(domainQuotaDto)
                    }, {
                        legend: "MANAGE_QUOTA.BOX_FORM.GRAPH.LEGEND.SPACE.REMAINING",
                        value: {
                            display: domainQuotaDto.getRemaining(!0),
                            real: domainQuotaDto.remaining
                        },
                        footer: domainQuotaDto.getQuota(!0)
                    }, {
                        legend: "MANAGE_QUOTA.BOX_FORM.GRAPH.LEGEND.SPACE.UNALLOCATED",
                        value: {
                            display: domainQuotaDto.getUnallocated(!0),
                            real: domainQuotaDto.unallocated
                        },
                        disabled: quotaUtilsService.isRootDomain(domainQuotaDto)
                    }],
                    chains: {
                        value: domainQuotaDto.quotaOverride,
                        position: quotaUtilsService.isRootDomain(domainQuotaDto) ? 0 : parentDomainQuotaDto.defaultQuota,
                        tooltip: {
                            enable: "MANAGE_QUOTA.BOX_FORM.GRAPH.TOOLTIP.RESET",
                            disable: "MANAGE_QUOTA.BOX_FORM.GRAPH.TOOLTIP.UNLINK",
                            param: quotaUtilsService.isRootDomain(domainQuotaDto) ? 0 : parentDomainQuotaDto.getDefaultQuota(!0)
                        },
                        disabled: quotaUtilsService.isRootDomain(domainQuotaDto)
                    }
                }
            }

            function buildGraphContainer(quotaDto, label) {
                var colors, element, parent, domainQuotaDto = quotaDto.domain;
                return "PERSONAL_SPACE" === label ? (colors = graphService.colors.purple, element = quotaDto.user, parent = quotaDto.parentUser) : (colors = graphService.colors.green, element = quotaDto.workgroup, parent = quotaDto.parentWorkgroup), {
                    colors: colors,
                    ruler: {
                        max: {
                            display: domainQuotaDto.getQuota(!0),
                            real: domainQuotaDto.quota
                        }
                    },
                    containers: [{
                        legend: "MANAGE_QUOTA.BOX_FORM.GRAPH.LEGEND.SPACE.USED",
                        label: "MANAGE_QUOTA.BOX_FORM.GRAPH.LEGEND.QUOTA." + label,
                        value: {
                            display: element.getUsedSpace(!0),
                            real: element.usedSpace
                        },
                        footer: !0
                    }, {
                        legend: "MANAGE_QUOTA.BOX_FORM.GRAPH.LEGEND.QUOTA.REMAINING",
                        value: {
                            display: element.getRemaining(!0),
                            real: element.remaining
                        },
                        footer: element.getQuota(!0)
                    }, {
                        legend: "MANAGE_QUOTA.BOX_FORM.GRAPH.LEGEND.SPACE.UNALLOCATED",
                        value: {
                            display: element.getUnallocated(!0),
                            real: element.unallocated
                        }
                    }],
                    chains: {
                        value: element.quotaOverride,
                        position: parent.defaultQuota,
                        tooltip: {
                            enable: "MANAGE_QUOTA.BOX_FORM.GRAPH.TOOLTIP.RESET",
                            disable: "MANAGE_QUOTA.BOX_FORM.GRAPH.TOOLTIP.UNLINK",
                            param: parent.getDefaultQuota(!0)
                        },
                        disabled: quotaUtilsService.isRootDomain(domainQuotaDto)
                    }
                }
            }

            function buildGraphDomainContainers(quotaDto, dynamic) {
                var domainQuotaDto = quotaDto.domain,
                    workgroupQuotaDto = quotaDto.workgroup,
                    parentWorkgroupQuotaDto = quotaDto.parentWorkgroup,
                    userQuotaDto = quotaDto.user,
                    parentUserQuotaDto = quotaDto.parentUser,
                    graph = {
                        colors: [graphService.colors.purpleStripes, graphService.colors.greenStripes],
                        ruler: {
                            max: {
                                colors: graphService.colors.orange,
                                display: 2 * domainQuotaDto.getQuota() + quotaUtilsService.unit.domains.quota,
                                real: 2 * domainQuotaDto.quota
                            }
                        },
                        limit: {
                            value: domainQuotaDto.getQuota(!0),
                            labels: {
                                middle: "MANAGE_QUOTA.BOX_FORM.GRAPH.LEGEND.QUOTA.OVER",
                                max: "MANAGE_QUOTA.BOX_FORM.GRAPH.LEGEND.QUOTA.MAX"
                            }
                        },
                        containers: [{
                            legend: "MANAGE_QUOTA.BOX_FORM.GRAPH.LEGEND.QUOTA.PERSONAL_SPACE",
                            value: {
                                display: userQuotaDto.getQuota(!0),
                                real: userQuotaDto.quota
                            }
                        }, {
                            legend: "MANAGE_QUOTA.BOX_FORM.GRAPH.LEGEND.QUOTA.SHARED_SPACE",
                            value: {
                                display: workgroupQuotaDto.getQuota(!0),
                                real: workgroupQuotaDto.quota
                            }
                        }, {
                            legend: "MANAGE_QUOTA.BOX_FORM.GRAPH.LEGEND.SPACE.UNALLOCATED",
                            value: {
                                display: function() {
                                    var value = dynamic ? 2 * domainQuotaDto.defaultQuota - (userQuotaDto.defaultQuota + workgroupQuotaDto.defaultQuota) : 2 * domainQuotaDto.quota - (userQuotaDto.quota + workgroupQuotaDto.quota),
                                        unit = unitService.find(value);
                                    return $filter("readableSize")(value, unit, !0)
                                },
                                real: 2 * domainQuotaDto.quota - (userQuotaDto.quota + workgroupQuotaDto.quota)
                            }
                        }]
                    };
                return dynamic ? (_.assign(graph.ruler.max, {
                    display: 2 * domainQuotaDto.getDefaultQuota() + quotaUtilsService.unit.domains.defaultQuota,
                    real: 2 * domainQuotaDto.defaultQuota
                }), _.assign(graph.limit, {
                    value: domainQuotaDto.getDefaultQuota(!0)
                }), _.assign(graph.containers[0], {
                    value: {
                        display: userQuotaDto.getDefaultQuota(!0),
                        real: userQuotaDto.defaultQuota
                    }
                }), _.assign(graph.containers[1], {
                    value: {
                        display: workgroupQuotaDto.getDefaultQuota(!0),
                        real: workgroupQuotaDto.defaultQuota
                    }
                }), _.assign(graph.containers[2], {
                    legend: "MANAGE_QUOTA.BOX_FORM.GRAPH.LEGEND.QUOTA.UNASSIGNED"
                }), _.assign(graph.containers[2].value, {
                    real: 2 * domainQuotaDto.defaultQuota - (userQuotaDto.defaultQuota + workgroupQuotaDto.defaultQuota)
                }), _.assign(graph, {
                    chains: [{
                        value: userQuotaDto.defaultQuotaOverride,
                        position: parentUserQuotaDto.defaultQuota,
                        tooltip: {
                            enable: "MANAGE_QUOTA.BOX_FORM.GRAPH.TOOLTIP.RESET",
                            disable: "MANAGE_QUOTA.BOX_FORM.GRAPH.TOOLTIP.UNLINK",
                            param: parentUserQuotaDto.getDefaultQuota(!0)
                        },
                        disabled: quotaUtilsService.isRootDomain(domainQuotaDto)
                    }, {
                        value: workgroupQuotaDto.defaultQuotaOverride,
                        position: parentUserQuotaDto.defaultQuota + parentWorkgroupQuotaDto.defaultQuota,
                        tooltip: {
                            enable: "MANAGE_QUOTA.BOX_FORM.GRAPH.TOOLTIP.RESET",
                            disable: "MANAGE_QUOTA.BOX_FORM.GRAPH.TOOLTIP.UNLINK",
                            param: parentWorkgroupQuotaDto.getDefaultQuota(!0)
                        },
                        disabled: quotaUtilsService.isRootDomain(domainQuotaDto)
                    }]
                })) : (_.assign(graph.containers[0], {
                    colors: {
                        border: graphService.colors.blue,
                        label: graphService.colors.blue
                    },
                    label: "MANAGE_QUOTA.BOX_FORM.GRAPH.LEGEND.QUOTA.DISTRIBUTION",
                    footer: !0
                }), _.assign(graph.containers[1], {
                    colors: {
                        border: graphService.colors.blue,
                        label: graphService.colors.blue
                    },
                    footer: function() {
                        var value = userQuotaDto.quota + workgroupQuotaDto.quota,
                            unit = unitService.find(value);
                        return $filter("readableSize")(value, unit, !0)
                    }
                })), graph
            }
            var service = {
                buildGraphDomain: buildGraphDomain,
                buildGraphContainer: buildGraphContainer,
                buildGraphDomainContainers: buildGraphDomainContainers
            };
            return service
        }
        angular.module("linshareAdminApp").factory("quotaGraphService", quotaGraphService), quotaGraphService.$inject = ["_", "$filter", "graphService", "quotaUtilsService", "unitService"]
    }(),
    function() {
        function quotaRestService($log, Restangular, Notification) {
            function getAccount(uuid) {
                return $log.debug("quotaRestService : getAccount", uuid), Restangular.all(restUrl).one(restParam.accounts, uuid).get()
            }

            function getContainer(uuid) {
                return $log.debug("quotaRestService : getContainer", uuid), Restangular.all(restUrl).one(restParam.containers, uuid).get()
            }

            function getDomain(uuid) {
                return $log.debug("quotaRestService : getDomain", uuid), Restangular.all(restUrl).one(restParam.domains, uuid).get()
            }

            function getListAccount() {
                return $log.debug("quotaRestService : getListAccount"), Restangular.one(restUrl, restParam.accounts).getList()
            }

            function getListContainer() {
                return $log.debug("quotaRestService : getListContainer"), Restangular.one(restUrl, restParam.containers).getList()
            }

            function getListDomain() {
                return $log.debug("quotaRestService : getListDomain"), Restangular.one(restUrl, restParam.domains).getList()
            }

            function updateAccount(accountQuotaDto) {
                return $log.debug("quotaRestService : updateAccount", accountQuotaDto), Restangular.all(restUrl).one(restParam.accounts, accountQuotaDto.uuid).customPUT(accountQuotaDto).then(function(data) {
                    return Notification.addSuccess("UPDATE"), data
                })
            }

            function updateContainer(containerQuotaDto) {
                return $log.debug("quotaRestService : updateContainer", containerQuotaDto), Restangular.all(restUrl).one(restParam.containers, containerQuotaDto.uuid).customPUT(containerQuotaDto).then(function(data) {
                    return Notification.addSuccess("UPDATE"), data
                })
            }

            function updateDomain(domainQuotaDto) {
                return $log.debug("quotaRestService : updateDomain", domainQuotaDto), Restangular.all(restUrl).one(restParam.domains, domainQuotaDto.uuid).customPUT(domainQuotaDto).then(function(data) {
                    return Notification.addSuccess("UPDATE"), data
                })
            }
            var restParam = {
                    accounts: "accounts",
                    containers: "containers",
                    domains: "domains"
                },
                restUrl = "quotas",
                service = {
                    getAccount: getAccount,
                    getContainer: getContainer,
                    getDomain: getDomain,
                    getListAccount: getListAccount,
                    getListContainer: getListContainer,
                    getListDomain: getListDomain,
                    updateAccount: updateAccount,
                    updateContainer: updateContainer,
                    updateDomain: updateDomain
                };
            return service
        }
        angular.module("linshareAdminApp").factory("quotaRestService", quotaRestService), quotaRestService.$inject = ["$log", "Restangular", "Notification"]
    }(),
    function() {
        function quotaUtilsService(_, $q, $timeout) {
            function capitalize(value) {
                return value.charAt(0).toUpperCase() + value.substr(1)
            }

            function formParser(form) {
                var promises = _.map(form, function(elm) {
                    return _.isUndefined(elm.$parsers) ? $q.when(!0) : _.map(elm.$parsers, function(parser) {
                        $timeout(function() {
                            return $q.when(parser(elm.$viewValue))
                        }, 0)
                    })
                });
                return $q.all(_.flatten(promises))
            }

            function formRender(form) {
                return formParser(form).then(function() {
                    return $q.when(_.forEach(form, function(elm) {
                        _.isUndefined(elm.$render) || elm.$render()
                    }))
                })
            }

            function getPercentage(dividend, divisor) {
                var result = dividend / divisor * 100;
                return result % 1 === 0 ? result : result.toFixed(2)
            }

            function hasSubdomain(quotaDto) {
                return quotaDto.domain.type === domainType.top || quotaDto.domain.type === domainType.root ? !0 : !1
            }

            function isRootDomain(quotaDto) {
                return quotaDto.domain.type === domainType.root
            }

            function manageOverride(element, parent, property) {
                var bool = property + "Override",
                    defaultPropertyName = "default" + capitalize(property.replace("default", "")),
                    getter = "get" + capitalize(defaultPropertyName),
                    setter = "set" + capitalize(property);
                element[bool] = !element[bool], element[bool] || (unit[element.type ? element.type.toLowerCase().replace("_", "") : element.route][property] = unit[parent.route][defaultPropertyName], parent[getter] && element[setter](parent[getter]()))
            }

            function setMatchingProperties(obj, keyToFind, val) {
                _.forOwn(obj, function(value, key) {
                    -1 !== key.indexOf(keyToFind) && (obj[key] = val)
                })
            }
            var domainType = {
                    root: "ROOTDOMAIN",
                    top: "TOPDOMAIN",
                    sub: "SUBDOMAIN",
                    guest: "GUESTDOMAIN"
                },
                unit = {
                    accounts: {
                        defaultQuota: void 0,
                        defaultMaxFileSize: void 0,
                        quota: void 0,
                        maxFileSize: void 0,
                        usedSpace: void 0
                    },
                    domains: {
                        defaultQuota: void 0,
                        quota: void 0,
                        currentValueForSubdomains: void 0,
                        usedSpace: void 0
                    },
                    parentdomains: {
                        quota: void 0,
                        defaultQuota: void 0
                    },
                    parentuser: {
                        defaultAccountQuota: void 0,
                        defaultMaxFileSize: void 0,
                        defaultQuota: void 0
                    },
                    parentworkgroup: {
                        defaultAccountQuota: void 0,
                        defaultMaxFileSize: void 0,
                        defaultQuota: void 0
                    },
                    user: {
                        accountQuota: void 0,
                        defaultAccountQuota: void 0,
                        defaultMaxFileSize: void 0,
                        defaultQuota: void 0,
                        maxFileSize: void 0,
                        quota: void 0,
                        usedSpace: void 0
                    },
                    workgroup: {
                        accountQuota: void 0,
                        defaultAccountQuota: void 0,
                        defaultMaxFileSize: void 0,
                        defaultQuota: void 0,
                        maxFileSize: void 0,
                        quota: void 0,
                        usedSpace: void 0
                    }
                },
                service = {
                    capitalize: capitalize,
                    formRender: formRender,
                    formParser: formParser,
                    getPercentage: getPercentage,
                    hasSubdomain: hasSubdomain,
                    isRootDomain: isRootDomain,
                    manageOverride: manageOverride,
                    setMatchingProperties: setMatchingProperties,
                    unit: unit
                };
            return service
        }
        angular.module("linshareAdminApp").factory("quotaUtilsService", quotaUtilsService), quotaUtilsService.$inject = ["_", "$q", "$timeout"]
    }(),
    function() {
        function unitService(_) {
            function byteTo(value, selectedUnit, showUnit) {
                var result = 0;
                if (_.isUndefined(value) || null === value || isNaN(value)) return result;
                var unit = _.isUndefined(selectedUnit) ? find(value) : selectedUnit;
                return result = value / Math.pow(10, units[unit].factor), result = result % 1 === 0 ? result : result.toFixed(2), showUnit ? result + " " + unit : result
            }

            function find(value) {
                var length = value.toString().length,
                    multiple3 = {
                        1: 3,
                        2: 3,
                        4: 6,
                        5: 6,
                        7: 9,
                        8: 9,
                        10: 12,
                        11: 12,
                        13: 15,
                        14: 15,
                        16: 18,
                        17: 18,
                        19: 21,
                        20: 21,
                        22: 24,
                        23: 24
                    },
                    size = {
                        3: units.B.value,
                        6: units.KB.value,
                        9: units.MB.value,
                        12: units.GB.value,
                        15: units.TB.value,
                        18: units.PB.value,
                        21: units.EB.value,
                        24: units.ZB.value
                    };
                return multiple3.hasOwnProperty(length) && (length = multiple3[length]), size.hasOwnProperty(length) ? size[length] : units.YB.value
            }

            function toByte(value, unit, showUnit) {
                var result = 0;
                return _.isUndefined(value) || null === value || isNaN(value) ? result : (result = value * Math.pow(10, units[unit].factor), result = result % 1 === 0 ? result : result.toFixed(2), showUnit ? result + units.B : result)
            }
            var units = {
                    B: {
                        value: "B",
                        factor: 0
                    },
                    KB: {
                        value: "KB",
                        factor: 3
                    },
                    MB: {
                        value: "MB",
                        factor: 6
                    },
                    GB: {
                        value: "GB",
                        factor: 9
                    },
                    TB: {
                        value: "TB",
                        factor: 12
                    },
                    PB: {
                        value: "PB",
                        factor: 15
                    },
                    EB: {
                        value: "EB",
                        factor: 18
                    },
                    ZB: {
                        value: "ZB",
                        factor: 21
                    },
                    YB: {
                        value: "YB",
                        factor: 24
                    }
                },
                service = {
                    byteTo: byteTo,
                    find: find,
                    toByte: toByte,
                    units: units
                };
            return service
        }
        angular.module("linshareAdminApp").factory("unitService", unitService), unitService.$inject = ["_"]
    }(),
    function() {
        function readableSize(_, unitService) {
            return function(value, unit, showUnit) {
                return _.isUndefined(value) ? 0 : unitService.byteTo(value, unit, showUnit)
            }
        }
        angular.module("linshareAdminApp").filter("readableSize", readableSize), readableSize.$inject = ["_", "unitService"]
    }(),
    function() {
        angular.module("graphApp", [])
    }(),
    function() {
        function graphService(_) {
            function manageColorsOverride(element) {
                var colors = {};
                return element.colors ? (_.isObject(element.colors) && _.forEach(element.colors, function(color, property) {
                    colors[property] = "graph-color-" + color + "-" + property
                }), _.isString(element.colors) && (colors.main = "graph-color-" + element.colors + "-main", colors.label = "graph-color-" + element.colors + "-label", colors.border = "graph-color-" + element.colors + "-border", colors.legend = "graph-color-" + element.colors + "-legend"), colors) : colors
            }

            function normalize(element) {
                var value = _.isObject(element) ? element : {
                    real: element,
                    display: element
                };
                return value.real = _.isFunction(value.real) ? value.real() : value.real, value.display = _.isFunction(value.display) ? value.display() : value.display, value
            }
            var colors = {
                    blue: "blue",
                    blueStripes: "blue-stripes",
                    green: "green",
                    greenStripes: "green-stripes",
                    grey: "grey",
                    orange: "orange",
                    purple: "purple",
                    purpleStripes: "purple-stripes"
                },
                service = {
                    colors: colors,
                    manageColorsOverride: manageColorsOverride,
                    normalize: normalize
                };
            return service
        }
        angular.module("graphApp").factory("graphService", graphService), graphService.$inject = ["_"]
    }(),
    function() {
        function lsGraph(_, $translate, graphService) {
            function linkFn(scope) {
                function calculus(graph) {
                    var containers = graph.containers;
                    graph.sum = _.reduce(containers, function(sum, container) {
                        if (container.disabled) return sum;
                        container.value = graphService.normalize(container.value);
                        var value = container.value.real;
                        return container.sum = _.isNumber(value) ? value : parseFloat(value), sum + container.sum
                    }, 0)
                }

                function manageColors(graph) {
                    graph.colors ? (graph.colors = _.isArray(graph.colors) ? graph.colors : [graph.colors], graph.colors = _.map(graph.colors, function(color) {
                        return "graph-color-" + color
                    })) : graph.colors = ["graph-color-blue", "graph-color-purple", "graph-color-green"];
                    for (var index = 0; graph.containers.length - graph.colors.length > 1;) graph.colors.push(graph.colors[index] + "-stripes"), index++;
                    graph.colors.push("")
                }

                function manageContainers(graph) {
                    function manageBorder(container, index) {
                        index < containers.length - 1 && (container.colors.main += container.dynamic ? " border-right" : " border-right-dotted")
                    }
                    var containers = graph.containers,
                        widthSum = 0;
                    _.forEach(containers, function(container, index) {
                        container.colors = graphService.manageColorsOverride(container), container.colors = {
                            main: container.colors.main || graph.colors[index] + "-main",
                            label: container.colors.label || graph.colors[index].replace("-stripes", "") + "-label",
                            border: container.colors.border || graph.colors[index].replace("-stripes", "") + "-border"
                        }, manageBorder(container, index), container.display = !1, container.width = 0, !container.disabled && container.sum > 0 && (container.width = container.sum / graph.sum * 100, container.width -= container.width >= 100 ? .07 * graph.containers.length : 0, widthSum += container.width, container.display = container.width > 3, container.areas && _.forEach(container.areas, function(area, index) {
                            area.colors = graphService.manageColorsOverride(area), area.value = graphService.normalize(area.value), area.width = 0 === area.value.real ? 0 : area.value.real / container.sum * 100, area.display = container.display && area.width > 3, container.display = area.display ? container.display : !1, area.colors.main = area.colors.main || "", area.colors.main += index > 0 ? " border-left-white" : ""
                        })), graph.alert = widthSum > 100
                    });
                    var containersVisible = _.filter(containers, {
                        display: !0
                    });
                    1 === containersVisible.length && (containersVisible[0].colors.main += " no-border")
                }

                function manageLabels(graph) {
                    graph.labels = [], _.forEach(graph.containers, function(container, index) {
                        container.label && (container.label = {
                            value: container.label,
                            colors: container.colors,
                            disabled: container.disabled,
                            position: index > 0 ? graph.containers[index - 1].width : 0
                        }, container.label.colors = {
                            label: container.label.colors.label || graph.colors[index].replace("-stripes", "") + "-label"
                        }, graph.labels.push(container.label))
                    })
                }

                function manageChain(graph) {
                    graph.chains && (graph.chains = _.isArray(graph.chains) ? graph.chains : [graph.chains], _.forEach(graph.chains, function(chain, index) {
                        chain.colors = graphService.manageColorsOverride(chain), chain.colors = {
                            main: chain.colors.main || graph.colors[index].replace("-stripes", "") + "-main",
                            label: chain.colors.label || graph.colors[index].replace("-stripes", "") + "-label"
                        }, chain.position && (chain.position = chain.position / graph.sum * 100)
                    }))
                }

                function manageLegends(graph) {
                    graph.legends = [], _.forEach(graph.containers, function(container, index) {
                        container.legend && (container.legend = {
                            value: container.legend,
                            colors: container.colors,
                            disabled: container.disabled,
                            param: container.display ? "" : {
                                value: container.value.display
                            }
                        }, container.legend.colors = {
                            legend: container.legend.colors.legend || graph.colors[index] + "-legend"
                        }, container.areas && (container.legend.colors.main = "hint", container.legend.tooltip = "", _.forEach(container.areas, function(area, index) {
                            $translate(area.tooltip, {
                                value: area.value.display
                            }).then(function(translation) {
                                container.legend.tooltip += translation + (index === container.areas.length - 1 ? "" : " / ")
                            })
                        })), graph.legends.push(container.legend))
                    })
                }

                function manageLimit(graph) {
                    graph.limit && (graph.limit.colors = graphService.manageColorsOverride(graph.limit), graph.limit.colors.label = graph.limit.colors.label || "graph-color-orange-label")
                }

                function manageRuler(graph) {
                    if (graph.ruler) {
                        var ruler = graph.ruler;
                        graph.ruler.max && (ruler.max = graphService.normalize(ruler.max), graph.sum = ruler.max.real, ruler.max.colors = graphService.manageColorsOverride(ruler.max), ruler.max.colors.main = ruler.max.colors.main || graph.colors[0].replace("-stripes", "") + "-main", ruler.max.colors.label = ruler.max.colors.label || graph.colors[0].replace("-stripes", "") + "-label")
                    }
                }
                scope.$watch("graph", function() {
                    var graph = scope.graph;
                    graph.containers && (calculus(graph), manageRuler(graph), manageColors(graph), manageContainers(graph), manageChain(graph), manageLabels(graph), manageLegends(graph), manageLimit(graph))
                })
            }
            var directive = {
                restrict: "A",
                templateUrl: "ng_components/quota/directives/lsgraph/graph-template.html",
                replace: !0,
                scope: {
                    graph: "=lsGraph"
                },
                link: linkFn
            };
            return directive
        }
        angular.module("graphApp").directive("lsGraph", lsGraph), lsGraph.$inject = ["_", "$translate", "graphService"]
    }(),
    function() {
        function graphLegends() {
            var directive = {
                restrict: "A",
                templateUrl: "ng_components/quota/directives/lsgraph/graph-legends/graph-legends-template.html",
                replace: !0,
                scope: {
                    legends: "=graphLegends"
                }
            };
            return directive
        }
        angular.module("graphApp").directive("graphLegends", graphLegends), graphLegends.$inject = []
    }(),
    function() {
        function graphLabel() {
            function linkFn(scope, elm) {
                var label = scope.label;
                label && elm.css("left", label.position + "%")
            }
            var directive = {
                restrict: "A",
                templateUrl: "ng_components/quota/directives/lsgraph/graph-label/graph-label-template.html",
                replace: !0,
                scope: {
                    label: "=graphLabel"
                },
                link: linkFn
            };
            return directive
        }
        angular.module("graphApp").directive("graphLabel", graphLabel), graphLabel.$inject = []
    }(),
    function() {
        function graphRuler(_) {
            function linkFn(scope) {
                function setMeasures(start, stop) {
                    var values = new Array(10),
                        measure = (stop - start) / 10;
                    return values = _.map(values, function(value, index) {
                        var pointer = start + measure * index;
                        return pointer === parseInt(pointer, 10) ? pointer : pointer.toFixed(2)
                    })
                }
                scope.$watch("ruler", function() {
                    var ruler = scope.ruler;
                    if (ruler.max) {
                        var max = ruler.max.display.replace(/[^\d.-]/g, ""),
                            min = ruler.min || 0;
                        ruler.measure = setMeasures(min, max)
                    }
                })
            }
            var directive = {
                restrict: "A",
                templateUrl: "ng_components/quota/directives/lsgraph/graph-ruler/graph-ruler-template.html",
                replace: !0,
                scope: {
                    ruler: "=graphRuler"
                },
                link: linkFn
            };
            return directive
        }
        angular.module("graphApp").directive("graphRuler", graphRuler), graphRuler.$inject = ["_"]
    }(),
    function() {
        function graphLimit() {
            var directive = {
                restrict: "A",
                templateUrl: "ng_components/quota/directives/lsgraph/graph-limit/graph-limit-template.html",
                replace: !0,
                scope: {
                    limit: "=graphLimit"
                }
            };
            return directive
        }
        angular.module("graphApp").directive("graphLimit", graphLimit), graphLimit.$inject = []
    }(),
    function() {
        function graphContainer(_) {
            function linkFn(scope, elm) {
                var container = scope.container;
                container.footer = container.footer || !1, _.isBoolean(container.footer) || (container.footer = {
                    value: _.isFunction(container.footer) ? container.footer() : container.footer
                }), elm.css("flex", "0 0 " + container.width + "%"), container.areas && (container.colors.main += " main-ctn-current-domain")
            }
            var directive = {
                restrict: "A",
                templateUrl: "ng_components/quota/directives/lsgraph/graph-container/graph-container-template.html",
                replace: !0,
                scope: {
                    container: "=graphContainer"
                },
                link: linkFn
            };
            return directive
        }
        angular.module("graphApp").directive("graphContainer", graphContainer), graphContainer.$inject = ["_"]
    }(),
    function() {
        function graphArea() {
            function linkFn(scope, elm) {
                var area = scope.area;
                elm.css("flex", "0 0 " + area.width + "%"), area.display = area.width < 2 ? !1 : area.display
            }
            var directive = {
                restrict: "A",
                templateUrl: "ng_components/quota/directives/lsgraph/graph-container/graph-area/graph-area-template.html",
                replace: !0,
                scope: {
                    area: "=graphArea"
                },
                link: linkFn
            };
            return directive
        }
        angular.module("graphApp").directive("graphArea", graphArea), graphArea.$inject = []
    }(),
    function() {
        function graphChain() {
            function linkFn(scope, elm) {
                var chain = scope.chain;
                chain && (elm.css("left", chain.position + "%"), chain["class"] = chain.colors.label, chain["class"] += chain.value ? " fa-chain-broken" : " fa-link show-link", chain.tooltip.displayed = chain.value ? chain.tooltip.enable : chain.tooltip.disable)
            }
            var directive = {
                restrict: "A",
                templateUrl: "ng_components/quota/directives/lsgraph/graph-chain/graph-chain-template.html",
                replace: !0,
                scope: {
                    chain: "=graphChain"
                },
                link: linkFn
            };
            return directive
        }
        angular.module("graphApp").directive("graphChain", graphChain), graphChain.$inject = []
    }(), angular.module("linshareAdminApp").factory("TechnicalAccount", ["$log", "Notification", "Restangular", function($log, Notification, Restangular) {
        return {
            getAll: function() {
                return $log.debug("TechnicalAccount:getAll"), Restangular.all("technical_accounts").getList()
            },
            get: function(id) {
                return $log.debug("TechnicalAccount:get"), Restangular.one("technical_accounts", id).get()
            },
            add: function(account) {
                return $log.debug("TechnicalAccount:add"), Restangular.all("technical_accounts").post(account).then(function() {
                    Notification.addSuccess("CREATE")
                })
            },
            update: function(account) {
                return $log.debug("TechnicalAccount:update"), account.put().then(function() {
                    Notification.addSuccess("UPDATE")
                })
            },
            changePassword: function(accountId, password) {
                return $log.debug("TechnicalAccount:changePassword"), Restangular.all("technical_accounts").all(accountId).all("change_password").post(password).then(function() {
                    Notification.addSuccess("UPDATE")
                })
            },
            remove: function(account) {
                return $log.debug("TechnicalAccount:remove"), account.remove().then(function() {
                    Notification.addSuccess("DELETE")
                })
            }
        }
    }]), angular.module("linshareAdminApp").controller("TechnicalAccountDetailCtrl", ["$scope", "$state", "$modal", "$log", "Password", "TechnicalAccount", "currentTechnicalAccount", "selectOptions", function($scope, $state, $modal, $log, Password, TechnicalAccount, currentTechnicalAccount, selectOptions) {
        $scope.state = $state.params.formState, $scope.account = currentTechnicalAccount || {}, $scope.permissionTypes = selectOptions.permissionTypes, "create" === $scope.state && ($scope.account.password = ""), $scope.tmp = {
            newPwdRetyped1: "",
            newPwdRetyped2: ""
        }, $scope.password = {
            oldPwd: "",
            newPwd: ""
        }, $scope.strengthScore = function(password) {
            return Password.strengthScore(password)
        }, $scope.match = function(a, b) {
            return Password.match(a, b)
        }, $scope.changePassword = function() {
            TechnicalAccount.changePassword($scope.account.uuid, $scope.password)
        }, $scope.submit = function() {
            "edit" === $scope.state ? TechnicalAccount.update($scope.account) : "create" === $scope.state ? TechnicalAccount.add($scope.account).then(function() {
                $state.go("technicalaccount.list")
            }) : $log.error("Invalid state")
        }, $scope.remove = function() {
            "edit" !== $scope.state && $log.error("Invalid state");
            var modalInstance = $modal.open({
                templateUrl: "ng_components/common/confirm_modal.tpl.html",
                controller: "ConfirmDialogCtrl",
                resolve: {
                    content: function() {
                        return "TECHNICAL_ACCOUNT.CONFIRM_DELETE_FORM.PARAGRAPH"
                    }
                }
            });
            modalInstance.result.then(function() {
                TechnicalAccount.remove($scope.account).then(function() {
                    $state.go("technicalaccount.list")
                })
            }, function() {
                $log.debug("Deletion modal dismissed")
            })
        }, $scope.reset = function() {
            $state.reinit()
        }
    }]), angular.module("linshareAdminApp").controller("TechnicalAccountListCtrl", ["$scope", "$filter", "$log", "$translate", "ngTableParams", "technicalAccounts", function($scope, $filter, $log, $translate, ngTableParams, technicalAccounts) {
        $scope.getTemplate = function() {
            return "TECHNICAL_ACCOUNT"
        }, $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            sorting: {
                name: "asc"
            }
        }, {
            debugMode: !1,
            total: 0,
            getData: function($defer, params) {
                var orderedData = params.sorting() ? $filter("orderBy")(technicalAccounts, params.orderBy()) : technicalAccounts;
                params.total(orderedData.length), $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()))
            }
        })
    }]), angular.module("linshareAdminApp").factory("Thread", ["$q", "$log", "Restangular", "Notification", function($q, $log, Restangular, Notification) {
        return {
            getAll: function(pattern) {
                return $log.debug("Thread:getAll"), null == pattern ? Restangular.all("threads").getList() : Restangular.all("threads").getList({
                    pattern: pattern
                })
            },
            get: function(id) {
                return $log.debug("Thread:get"), Restangular.one("threads", id).get()
            },
            update: function(thread) {
                return $log.debug("Thread:update"), thread.put().then(function() {
                    Notification.addSuccess("UPDATE")
                })
            },
            remove: function(thread) {
                return $log.debug("Thread:remove"), thread.remove().then(function() {
                    Notification.addSuccess("DELETE")
                })
            }
        }
    }]), angular.module("linshareAdminApp").controller("ThreadDetailCtrl", ["$rootScope", "$scope", "$filter", "$log", "$state", "ngTableParams", "Thread", "ThreadMember", "User", "currentThread", function($rootScope, $scope, $filter, $log, $state, ngTableParams, Thread, ThreadMember, User, currentThread) {
        $scope.thread = currentThread, $scope.search = $state.params.search, $scope.reloadList = function() {
            $scope.tableParams.reload()
        }, $scope.remove = function() {
            Thread.remove($scope.thread).then(function() {
                $state.go("thread.list")
            })
        }, $scope.reset = function() {
            $state.reinit()
        }, $scope.submit = function() {
            Thread.update($scope.thread)
        }, $scope.addMember = function(member) {
            member.admin = $scope.userDefaultAdmin, member.readonly = $scope.userDefaultReadOnly, ThreadMember.add($scope.thread, member).then(function() {
                $scope.reloadList(), $scope.userToAdd = void 0
            })
        }, $scope.autocompleteUsers = function(pattern) {
            return User.autocomplete(pattern).then(function(users) {
                return angular.forEach($scope.threadMembers, function(threadMember) {
                    angular.forEach(users, function(user, key) {
                        user.domain === threadMember.userDomainId && user.mail === threadMember.userMail && users.splice(key, 1)
                    })
                }), users
            })
        }, $scope.updateMember = function(member) {
            ThreadMember.update(member)
        }, $scope.deleteMember = function(member) {
            ThreadMember.remove(member).then(function() {
                $scope.reloadList()
            })
        }, $scope.$watch("userToAdd", function() {
            $scope.tableParams.filter().firstName && ($scope.tableParams.filter().firstName = ""), $scope.tableParams.filter().lastName && ($scope.tableParams.filter().lastName = ""), $scope.reloadList()
        }), $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            sorting: {
                firstName: "asc"
            }
        }, {
            debugMode: !1,
            total: 0,
            getData: function($defer, params) {
                ThreadMember.getAll($scope.thread).then(function(threadMembers) {
                    $scope.threadMembers = threadMembers;
                    var filteredData = $filter("filter")(threadMembers, $scope.userToAdd);
                    filteredData = $filter("filter")(filteredData, params.filter());
                    var orderedData = params.sorting() ? $filter("orderBy")(filteredData, params.orderBy()) : filteredData;
                    params.total(orderedData.length), $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()))
                })
            }
        })
    }]), angular.module("linshareAdminApp").controller("ThreadListCtrl", ["$scope", "$filter", "$log", "$state", "$location", "$translate", "ngTableParams", "Thread", function($scope, $filter, $log, $state, $location, $translate, ngTableParams, Thread) {
        $scope.isCollapsed = !0, $scope.getTemplate = function() {
            return "THREADS"
        };
        var canRequest = !1;
        $state.params.search && ($scope.threadSearch = $state.params.search, canRequest = !0), $scope.isClicked = function() {
            $location.search("search", $scope.threadSearch), canRequest = !0, $scope.tableParams.reload()
        }, $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            sorting: {
                name: "asc"
            }
        }, {
            debugMode: !1,
            total: 0,
            getData: function($defer, params) {
                canRequest && Thread.getAll($scope.threadSearch).then(function(thread) {
                    var filteredData = params.filter() ? $filter("filter")(thread, params.filter()) : thread,
                        orderedData = params.sorting() ? $filter("orderBy")(filteredData, params.orderBy()) : filteredData;
                    params.total(orderedData.length), $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()))
                })
            }
        })
    }]), angular.module("linshareAdminApp").factory("ThreadMember", ["$log", "Restangular", function($log, Restangular) {
        var getThreadMemberDto = function(thread, user) {
            return {
                threadUuid: thread.uuid,
                userUuid: user.uuid,
                userMail: user.mail,
                userDomainId: user.domain,
                readonly: user.readonly,
                admin: user.admin
            }
        };
        return {
            getAll: function(thread) {
                return $log.debug("ThreadMember:getAll"), Restangular.one("threads", thread.uuid).all("members").getList()
            },
            add: function(thread, user) {
                $log.debug("ThreadMember:add");
                var threadMember = getThreadMemberDto(thread, user);
                return Restangular.all("thread_members").post(threadMember)
            },
            update: function(threadMember) {
                return $log.debug("ThreadMember:update"), Restangular.all("thread_members").customPUT(threadMember);

            },
            remove: function(threadMember) {
                return $log.debug("ThreadMember:remove"), Restangular.all("thread_members").customOperation("remove", "", {}, {}, threadMember)
            }
        }
    }]),
    function() {
        angular.module("linshareAdminApp").constant("upgradeTasksConstants", {
            criticality: {
                MANDATORY: {
                    value: "MANDATORY",
                    order: 10
                },
                REQUIRED: {
                    value: "REQUIRED",
                    order: 5
                }
            },
            log: {
                DEBUG: "DEBUG",
                ERROR: "ERROR",
                INFO: "INFO",
                WARNING: "WARNING"
            },
            status: {
                NEW: "NEW",
                PENDING: "PENDING",
                PROCESSING: "PROCESSING",
                SUCCESS: "SUCCESS",
                FAILED: "FAILED"
            }
        })
    }(),
    function() {
        function UpgradeTasksController(_, $filter, $modal, $q, $scope, $state, $timeout, moment, ngTableParams, upgradeTasksConstants, upgradeTasksRestService) {
            function activate() {
                loadTable().then(function(tableData) {
                    upgradeTasksVm.tableParams = tableData
                })
            }

            function getHelp() {
                return "UPGRADE_TASKS"
            }

            function loadTable() {
                var deferred = $q.defer();
                return deferred.resolve(new ngTableParams({
                    page: 1,
                    count: 25,
                    sorting: {
                        taskOrder: "asc"
                    }
                }, {
                    debugMode: !1,
                    getData: function($defer, params) {
                        return upgradeTasksRestService.getList().then(function(upgradeTasksData) {
                            _.forEach(upgradeTasksData, function(upgradeTask) {
                                setUpgradeTaskActions(upgradeTask)
                            });
                            var list = params.sorting() ? $filter("orderBy")(upgradeTasksData, params.orderBy()) : upgradeTasksData;
                            params.total(list.length), $defer.resolve(list.slice((params.page() - 1) * params.count(), params.page() * params.count()))
                        })
                    }
                })), deferred.promise
            }

            function setUpgradeTaskActions(upgradeTask) {
                upgradeTask.canExecute = function() {
                    return this.isParentDone() && this.status === upgradeTasksVm.status.NEW
                }, upgradeTask.canRetry = function() {
                    return this.isParentDone() && this.status !== upgradeTasksVm.status.NEW
                }, upgradeTask.canShowConsole = function() {
                    return !_.isUndefined(this.asyncTaskUuid) && null !== this.asyncTaskUuid
                }, upgradeTask.execute = function() {
                    function doExecute(upgradeTask) {
                        upgradeTasksVm.upgradeTasksRestService.execute(upgradeTask.identifier, !0).then(function(upgradeTaskData) {
                            $timeout(function() {
                                _.assign(upgradeTask, upgradeTaskData), upgradeTask.showConsole()
                            }, 1e3)
                        })
                    }
                    var self = this;
                    if (self.canExecute()) doExecute(self);
                    else if (self.canRetry()) {
                        var modalScope = $scope.$new();
                        modalScope.status = self.status, $modal.open({
                            templateUrl: "ng_components/upgradetasks/views/upgradetasks.modal.html",
                            scope: modalScope
                        }).result.then(function(validate) {
                            validate && doExecute(self)
                        })
                    }
                }, upgradeTask.isParentDone = function() {
                    return _.isUndefined(this.parentIdentifier) || null === this.parentIdentifier ? !0 : !_.isUndefined(_.find(upgradeTasksVm.tableParams.data, {
                        identifier: this.parentIdentifier,
                        status: upgradeTasksVm.status.SUCCESS
                    }))
                }, upgradeTask.showConsole = function() {
                    this.canShowConsole() && $state.go("upgradetasks.asynctasks.details", {
                        upgradeTasksId: this.identifier,
                        asyncTasksUuid: this.asyncTaskUuid
                    })
                }
            }
            var upgradeTasksVm = this;
            upgradeTasksVm.getHelp = getHelp, upgradeTasksVm.status = upgradeTasksConstants.status, upgradeTasksVm.upgradeTasksRestService = upgradeTasksRestService, activate()
        }
        angular.module("linshareAdminApp").controller("UpgradeTasksController", UpgradeTasksController), UpgradeTasksController.$inject = ["_", "$filter", "$modal", "$q", "$scope", "$state", "$timeout", "moment", "ngTableParams", "upgradeTasksConstants", "upgradeTasksRestService"]
    }(),
    function() {
        function AsyncTasksController(_, $filter, $q, $state, $window, moment, ngTableParams, upgradeTask, upgradeTasksRestService) {
            function activate() {
                loadTable().then(function(tableData) {
                    asyncTasksVm.tableParams = tableData
                })
            }

            function getHelp() {
                return "ASYNC_TASKS"
            }

            function loadTable() {
                var deferred = $q.defer();
                return deferred.resolve(new ngTableParams({
                    page: 1,
                    count: 10,
                    sorting: {
                        modificationDate: "desc"
                    }
                }, {
                    debugMode: !1,
                    getData: function($defer, params) {
                        return upgradeTasksRestService.getTasksList(upgradeTask.identifier).then(function(asyncTasksData) {
                            _.forEach(asyncTasksData, function(asyncTask) {
                                setAsyncTaskActions(asyncTask), asyncTask.modificationDate = asyncTask.modificationDate, asyncTask.creationDate = moment(asyncTask.creationDate).format("ll") + " " + moment(asyncTask.creationDate).format("LTS")
                            });
                            var list = params.sorting() ? $filter("orderBy")(asyncTasksData, params.orderBy()) : asyncTasksData;
                            params.total(list.length), $defer.resolve(list.slice((params.page() - 1) * params.count(), params.page() * params.count()))
                        })
                    }
                })), deferred.promise
            }

            function setAsyncTaskActions(asyncTask) {
                function getDuration(humanize) {
                    return humanize ? moment.duration(asyncTask.processingDuration).humanize() : moment.utc(moment.duration(asyncTask.processingDuration).asMilliseconds()).format("HH:mm:ss.SSS")
                }

                function showConsole() {
                    $state.go("upgradetasks.asynctasks.details", {
                        upgradeTasksId: asyncTasksVm.upgradeTask.identifier,
                        asyncTasksUuid: this.uuid
                    })
                }
                asyncTask.showConsole = showConsole, asyncTask.getDuration = getDuration
            }
            var asyncTasksVm = this;
            asyncTasksVm.$window = $window, asyncTasksVm.getHelp = getHelp, asyncTasksVm.upgradeTask = upgradeTask, asyncTasksVm.upgradeTasksRestService = upgradeTasksRestService, activate()
        }
        angular.module("linshareAdminApp").controller("AsyncTasksController", AsyncTasksController), AsyncTasksController.$inject = ["_", "$filter", "$q", "$state", "$window", "moment", "ngTableParams", "upgradeTask", "upgradeTasksRestService"]
    }(),
    function() {
        function AsyncTasksDetailsController(_, $scope, $window, asyncTask, moment, upgradeTask, upgradeTasksConstants, upgradeTasksRestService) {
            function activate() {
                asyncTaskVm.console = {
                    data: {}
                }, asyncTaskVm.log = {
                    selected: {
                        DEBUG: !1,
                        ERROR: !0,
                        INFO: !0,
                        WARNING: !0
                    },
                    values: Object.values(upgradeTasksConstants.log)
                }, asyncTaskVm.timer = 5e3, createRefresher(), $scope.$on("$destroy", function() {
                    clearInterval(asyncTaskVm.refresher)
                })
            }

            function createRefresher() {
                asyncTaskVm.refresher = refresher()
            }

            function filterLog() {
                asyncTaskVm.console.show = _.cloneDeep(_.filter(asyncTaskVm.console.data, function(line) {
                    return asyncTaskVm.log.selected[line.criticity.replace(/\u00A0/g, "")]
                }))
            }

            function getConsole() {
                upgradeTasksRestService.getTaskConsole(upgradeTask.identifier, asyncTask.uuid, asyncTaskVm.fromDate).then(function(consoleData) {
                    var values = consoleData.plain();
                    _.forEach(values, function(line) {
                        switch (line.creationDate = moment(line.creationDate).format("L") + " - " + moment(line.creationDate).format("LTS"), line.criticity) {
                            case upgradeTasksConstants.log.DEBUG:
                            case upgradeTasksConstants.log.ERROR:
                                line.criticity += "   ";
                                break;
                            case upgradeTasksConstants.log.INFO:
                                line.criticity += "    "
                        }
                    }), _.assign(asyncTaskVm.console.data, values), filterLog()
                }), asyncTaskVm.fromDate = moment().subtract(1, "seconds").toISOString()
            }

            function getHelp() {
                return "ASYNC_TASK"
            }

            function refresher() {
                return setInterval(function() {
                    getConsole(), upgradeTasksRestService.get(upgradeTask.identifier).then(function(data) {
                        data.status !== upgradeTasksConstants.status.PROCESSING && data.status !== upgradeTasksConstants.status.PENDING && clearInterval(asyncTaskVm.refresher)
                    })["catch"](function() {
                        clearInterval(asyncTaskVm.refresher)
                    })
                }, asyncTaskVm.timer)
            }
            var asyncTaskVm = this;
            asyncTaskVm.$window = $window, asyncTaskVm.asyncTask = asyncTask, asyncTaskVm.createRefresher = createRefresher, asyncTaskVm.filterLog = filterLog, asyncTaskVm.getHelp = getHelp, asyncTaskVm.upgradeTask = upgradeTask, activate()
        }
        angular.module("linshareAdminApp").controller("AsyncTasksDetailsController", AsyncTasksDetailsController), AsyncTasksDetailsController.$inject = ["_", "$scope", "$window", "asyncTask", "moment", "upgradeTask", "upgradeTasksConstants", "upgradeTasksRestService"]
    }(),
    function() {
        function upgradeTasksRestService($log, Restangular) {
            function execute(identifier, force) {
                return $log.debug("upgradeTasksRestService : execute", identifier, force), Restangular.one(restUrl, identifier).customPUT({}, null, {
                    force: force
                })
            }

            function get(identifier) {
                return $log.debug("upgradeTasksRestService : get", identifier), Restangular.one(restUrl, identifier).get()
            }

            function getList() {
                return $log.debug("upgradeTasksRestService : getList"), Restangular.all(restUrl).getList()
            }

            function getTask(upgradeTaskId, asyncTaskUuid) {
                return $log.debug("upgradeTasksRestService : getTask", upgradeTaskId, asyncTaskUuid), Restangular.one(restUrl, upgradeTaskId).one(restParam.asyncTasks, asyncTaskUuid).get()
            }

            function getTaskConsole(upgradeTaskId, asyncTaskUuid, fromDate) {
                return $log.debug("upgradeTasksRestService : getTaskConsole", upgradeTaskId, asyncTaskUuid), Restangular.one(restUrl, upgradeTaskId).one(restParam.asyncTasks, asyncTaskUuid).one(restParam.console).get({
                    fromDate: fromDate
                })
            }

            function getTasksList(upgradeTaskId) {
                return $log.debug("upgradeTasksRestService : getTasksList", upgradeTaskId), Restangular.one(restUrl, upgradeTaskId).one(restParam.asyncTasks).get()
            }
            var restParam = {
                    asyncTasks: "async_tasks",
                    console: "console"
                },
                restUrl = "upgrade_tasks",
                service = {
                    execute: execute,
                    get: get,
                    getList: getList,
                    getTask: getTask,
                    getTaskConsole: getTaskConsole,
                    getTasksList: getTasksList
                };
            return service
        }
        angular.module("linshareAdminApp").factory("upgradeTasksRestService", upgradeTasksRestService), upgradeTasksRestService.$inject = ["$log", "Restangular"]
    }(), angular.module("linshareAdminApp").factory("UploadPropositionFilter", ["$log", "Notification", "Restangular", function($log, Notification, Restangular) {
        return {
            getAll: function() {
                return $log.debug("UploadPropositionFilter:getAll"), Restangular.all("upload_proposition_filters").getList()
            },
            get: function(id) {
                return $log.debug("UploadPropositionFilter:get"), Restangular.one("upload_proposition_filters", id).get()
            },
            add: function(filter) {
                return $log.debug("UploadPropositionFilter:add"), Restangular.all("upload_proposition_filters").post(filter).then(function() {
                    Notification.addSuccess("CREATE")
                })
            },
            update: function(filter, notify) {
                return $log.debug("UploadPropositionFilter:update"), notify = "undefined" != typeof notify ? notify : !0, filter.put().then(function() {
                    notify && Notification.addSuccess("UPDATE")
                })
            },
            remove: function(filter) {
                return $log.debug("UploadPropositionFilter:remove"), filter.remove().then(function() {
                    Notification.addSuccess("DELETE")
                })
            }
        }
    }]), angular.module("linshareAdminApp").controller("UploadPropositionFilterDetailCtrl", ["$scope", "$state", "$log", "selectOptions", "UploadPropositionFilter", "currentUploadPropositionFilter", function($scope, $state, $log, selectOptions, UploadPropositionFilter, currentUploadPropositionFilter) {
        $scope.filter = currentUploadPropositionFilter || {}, $scope.state = $state.params.formState, $scope.fieldTypes = selectOptions.fieldTypes, $scope.operatorTypes = selectOptions.operatorTypes, $scope.actionTypes = selectOptions.actionTypes, $scope.matchTypes = selectOptions.matchTypes, "create" === $scope.state && ($scope.filter.uploadPropositionRules = [], $scope.filter.uploadPropositionActions = [], $scope.filter.uploadPropositionActions[0] = {}, $scope.filter.match = "TRUE"), $scope.addRule = function() {
            $scope.filter.uploadPropositionRules.push({})
        }, $scope.deleteRule = function(index) {
            $scope.filter.uploadPropositionRules.splice(index, 1)
        }, $scope.submit = function() {
            "create" === $scope.state ? UploadPropositionFilter.add($scope.filter).then(function() {
                $scope.cancel()
            }) : UploadPropositionFilter.update($scope.filter).then(function() {
                $scope.cancel()
            })
        }, $scope.remove = function() {
            "edit" !== $scope.state && $log.error("Invalid state"), UploadPropositionFilter.remove($scope.filter).then(function() {
                $scope.cancel()
            })
        }, $scope.cancel = function() {
            $state.go("uploadpropositionfilter.list")
        }, $scope.reset = function() {
            $state.reinit()
        }
    }]), angular.module("linshareAdminApp").controller("UploadPropositionFilterListCtrl", ["$scope", "$filter", "$log", "$translate", "ngTableParams", "UploadPropositionFilter", "uploadPropositionFilters", function($scope, $filter, $log, $translate, ngTableParams, UploadPropositionFilter, uploadPropositionFilters) {
        $scope.getTemplate = function() {
            return "UPLOAD_PROPOSITION_FILTERING"
        }, $scope.swap = function(x, y, data) {
            data[x].order = y, data[y].order = x, UploadPropositionFilter.update(data[x], !1).then(function() {
                UploadPropositionFilter.update(data[y]).then(function() {
                    $scope.reloadList()
                })
            })
        }, $scope.reloadList = function() {
            $scope.tableParams.reload()
        }, $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            sorting: {
                order: "asc"
            }
        }, {
            debugMode: !1,
            total: 0,
            getData: function($defer, params) {
                var orderedData = params.sorting() ? $filter("orderBy")(uploadPropositionFilters, params.orderBy()) : uploadPropositionFilters;
                params.total(orderedData.length), $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count())), $scope.isCollapsed = 0 === orderedData.length ? !0 : !1
            }
        })
    }]), angular.module("linshareAdminApp").factory("UploadRequest", ["$log", "Restangular", function($log, Restangular) {
        return {
            query: function(criteria) {
                return $log.debug("UploadRequest:query"), Restangular.all("upload_requests").post(criteria)
            },
            history: function(uploadRequestUuid) {
                return $log.debug("UploadRequest:history"), Restangular.all("upload_requests").one("history", uploadRequestUuid).getList()
            }
        }
    }]), angular.module("linshareAdminApp").controller("UploadRequestFormCtrl", ["$scope", "$filter", "$log", "ngTableParams", "UploadRequest", "uploadRequestStatus", function($scope, $filter, $log, ngTableParams, UploadRequest, uploadRequestStatus) {
        $scope.allStatus = uploadRequestStatus, $scope.criteria = {
            status: []
        }, $scope.toggleSelection = function(s) {
            var idx = $scope.criteria.status.indexOf(s);
            idx > -1 ? $scope.criteria.status.splice(idx, 1) : $scope.criteria.status.push(s)
        }, $scope.reloadList = function() {
            $scope.tableParams.reload()
        }, $scope.opened = {
            from: !1,
            to: !1
        }, $scope.humanFileSize = function(bytes, si) {
            var thresh = si ? 1e3 : 1024;
            if (thresh > bytes) return bytes + " B";
            var units = si ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"] : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"],
                u = -1;
            do bytes /= thresh, ++u; while (bytes >= thresh);
            return bytes.toFixed(1) + " " + units[u]
        }, $scope.setCurrentUuid = function(uuid) {
            $scope.currentUuid = uuid, $scope.tableParamsHistory.reload()
        }, $scope.open = function(key, $event) {
            $event.preventDefault(), $event.stopPropagation(), $scope.opened[key] = !0
        }, $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            sorting: {
                subject: "desc"
            }
        }, {
            debugMode: !1,
            total: 0,
            getData: function($defer, params) {
                UploadRequest.query($scope.criteria).then(function(uploadRequests) {
                    $scope.currentUuid = void 0;
                    var orderedData = params.sorting() ? $filter("orderBy")(uploadRequests, params.orderBy()) : uploadRequests;
                    params.total(orderedData.length), $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()))
                })
            }
        }), $scope.tableParamsHistory = new ngTableParams({
            page: 1,
            count: 10,
            sorting: {
                modificationDate: "desc"
            }
        }, {
            debugMode: !1,
            total: 0,
            getData: function($defer, params) {
                $scope.currentUuid ? UploadRequest.history($scope.currentUuid).then(function(history) {
                    var orderedData = params.sorting() ? $filter("orderBy")(history, params.orderBy()) : history;
                    params.total(orderedData.length), $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()))
                }) : $defer.resolve()
            }
        })
    }]), angular.module("linshareAdminApp").factory("User", ["$q", "$log", "Restangular", "Notification", "$http", function($q, $log, Restangular, Notification, $http) {
        return {
            autocomplete: function(pattern) {
                return $log.debug("User:autocomplete"), Restangular.all("users").one("autocomplete", pattern).get()
            },
            search: function(userSearchDto) {
                return $log.debug("User:search"), Restangular.all("users").customPOST(userSearchDto, "search").then(function(users) {
                    angular.forEach(users, function(user) {
                        user = Restangular.restangularizeElement(null, user, "users")
                    });
                    var dfd = $q.defer();
                    return dfd.resolve(users), dfd.promise
                })
            },
            get: function(uuid) {
                return $log.debug("User:get"), Restangular.one("users", uuid).get()
            },
            exist: function(uuid) {
                return $log.debug("User:exist"), Restangular.one("users", uuid).head()
            },
            getAllInconsistent: function() {
                return $log.debug("User:getAllInconsistent"), Restangular.all("users").all("inconsistent").getList()
            },
            getInconsistencyStatus: function(mail) {
                return $log.debug("User:getInconsistencyStatus"), Restangular.all("users").all("inconsistent/check").customPOST(mail)
            },
            autocompleteInconsistent: function(pattern) {
                $log.debug("User:autocompleteInconsistent");
                var userSearchDto = {
                    mail: pattern
                };
                return Restangular.all("users").all("inconsistent/autocomplete").customPOST(userSearchDto)
            },
            update: function(user) {
                return $log.debug("User:update"), user.put().then(function() {
                    Notification.addSuccess("UPDATE")
                })
            },
            updateInconsistent: function(user) {
                return $log.debug("User:update User with Inconsistent EndPoint"), Restangular.all("users").all("inconsistent").customPUT(user).then(function() {
                    Notification.addSuccess("UPDATE")
                })
            },
            remove: function(user) {
                return $log.debug("User:remove"), user.remove().then(function() {
                    Notification.addSuccess("DELETE")
                })
            },
            changeInternalUsersEmail: function(csvFormData) {
                return $http.post("/linshare/users/mail_migration", csvFormData, {
                    transformRequest: angular.identity,
                    headers: {
                        "Content-Type": void 0
                    }
                }).then(function(state) {
                    Notification.addSuccess("MIGRATION_SUCCEED"), $log.debug("Success of the emails migration", state);
                    var dfd = $q.defer();
                    return dfd.resolve(state), dfd.promise
                }, function(error) {
                    Notification.addError(error), $log.debug("Error of the emails migration", error);
                    var dfd = $q.defer();
                    return dfd.resolve(error), dfd.promise
                })
            }
        }
    }]), angular.module("linshareAdminApp").controller("UserDetailCtrl", ["_", "$filter", "$log", "$modal", "$rootScope", "$scope", "$state", "$timeout", "currentUser", "graphService", "lsAppConfig", "maxExpiryDate", "quotaRestService", "quotaUtilsService", "restrictedGuestStatus", "selectOptions", "unitService", "User", function(_, $filter, $log, $modal, $rootScope, $scope, $state, $timeout, currentUser, graphService, lsAppConfig, maxExpiryDate, quotaRestService, quotaUtilsService, restrictedGuestStatus, selectOptions, unitService, User) {
        function buildGraph() {
            return {
                colors: [graphService.colors.blue, graphService.colors.blueStripes],
                ruler: {
                    max: {
                        display: $scope.userQuotaDto.getQuota(!0),
                        real: $scope.userQuotaDto.getQuota()
                    }
                },
                containers: [{
                    legend: "MANAGE_QUOTA.BOX_FORM.GRAPH.LEGEND.SPACE.USED",
                    value: {
                        display: $scope.userQuotaDto.getUsedSpace(!0),
                        real: $scope.userQuotaDto.usedSpace
                    }
                }, {
                    legend: "MANAGE_QUOTA.BOX_FORM.GRAPH.LEGEND.QUOTA.REMAINING",
                    value: {
                        display: $scope.userQuotaDto.getRemaining(!0),
                        real: $scope.userQuotaDto.remaining
                    }
                }]
            }
        }

        function initDto(data) {
            $scope.userQuotaDto = data, $scope.userQuotaDtoCloned = _.cloneDeep(data), $scope.unitCloned = _.cloneDeep($scope.unit), setModelGetSet(data)
        }

        function manageOverride(form, element, property) {
            quotaUtilsService.manageOverride(element, element, property), $scope.formRender(form).then(function(form) {
                form.$invalid || $scope.buildGraph()
            })
        }

        function setModelGetSet(data) {
            var keyName = _.find(Object.keys($scope.unit), function(key) {
                return key === data.route ? !0 : data.type ? data.type.toLowerCase().replace("_", "") === key : ""
            });
            _.forEach(Object.keys($scope.unit[keyName]), function(propertyKey) {
                $scope.unit[keyName][propertyKey] = _.isUndefined(data[propertyKey]) || null === data[propertyKey] ? "GB" : $scope.unitService.find(data[propertyKey]), data["get" + quotaUtilsService.capitalize(propertyKey)] = function(withUnit) {
                    return $filter("readableSize")(data[propertyKey], $scope.unit[keyName][propertyKey], withUnit)
                }, data["set" + quotaUtilsService.capitalize(propertyKey)] = function(newValue, form) {
                    data[propertyKey] = $scope.unitService.toByte(newValue, $scope.unit[keyName][propertyKey]), data["get" + quotaUtilsService.capitalize(propertyKey)] = function(withUnit) {
                        return $filter("readableSize")(data[propertyKey], $scope.unit[keyName][propertyKey], withUnit)
                    }, $scope.formRender(form)
                }, data.updateGraph = function(form) {
                    $scope.formRender(form).then(function(form) {
                        form.$invalid || ($scope.graph = buildGraph())
                    })
                }
            }), data.isExceeded = function() {
                var initDto = _.find($scope.cloned, function(dto) {
                    return dto.uuid === data.uuid
                });
                return initDto.usedSpace >= initDto.quota
            }, data.remaining = data.quota - data.usedSpace, data.getRemaining = function(withUnit) {
                withUnit = withUnit || !1, data.remaining = data.quota - data.usedSpace;
                var unit = $scope.unitService.find(data.remaining);
                return $filter("readableSize")(data.remaining, unit, withUnit)
            }, data.unallocated = data.defaultQuota - data.quota, data.unallocated = data.unallocated > 0 ? data.unallocated : 0, data.getUnallocated = function(withUnit) {
                withUnit = withUnit || !1, data.unallocated = data.defaultQuota - data.quota, data.unallocated = data.unallocated > 0 ? data.unallocated : 0;
                var unit = $scope.unitService.find(data.unallocated);
                return $filter("readableSize")(data.unallocated, unit, withUnit)
            }
        }

        function setParentDefault(form) {
            quotaUtilsService.setMatchingProperties($scope.userQuotaDto, "Override", !1), $scope.userQuotaDto.quota = $scope.userQuotaDto.defaultQuota, $scope.userQuotaDto.maxFileSize = $scope.userQuotaDto.defaultMaxFileSize, $scope.submitQuota(form)
        }

        function submitQuota(form) {
            quotaRestService.updateAccount(_.omit($scope.userQuotaDto, ["remaining", "unallocated"])).then(function(userData) {
                initDto(userData), $scope.formRender(form)
            }).then(function() {
                $scope.graph = buildGraph()
            })
        }

        function resetQuota(form) {
            $scope.userQuotaDto = _.cloneDeep($scope.userQuotaDtoCloned), $scope.unit = _.cloneDeep($scope.unitCloned), setModelGetSet($scope.userQuotaDto), $scope.formRender(form).then(function() {
                $scope.graph = buildGraph()
            })
        }
        $scope.lsAppConfig = lsAppConfig, $scope.userRoles = selectOptions.userRoles, $scope.userRolesSimple = ["SIMPLE", "ADMIN"], $scope.user = currentUser, $scope.unit = quotaUtilsService.unit, $scope.unit.value = _.map(unitService.units, function(unit) {
            return unit.value
        }), $scope.buildGraph = buildGraph, $scope.formRender = quotaUtilsService.formRender, $scope.manageOverride = manageOverride, $scope.resetQuota = resetQuota, $scope.setParentDefault = setParentDefault, $scope.submitQuota = submitQuota, $scope.unitService = unitService, quotaRestService.getAccount($scope.user.quotaUuid).then(function(userData) {
            initDto(userData), $scope.graph = buildGraph(), $scope.isGraphReady = !0
        }), $scope.limit = maxExpiryDate, $scope.restrictedDisabled = restrictedGuestStatus, $scope.selectEnumLanguage = selectOptions.selectEnumLanguage, $scope.selectMailLanguage = selectOptions.selectMailLanguage, $scope.open = function($event) {
            $event.preventDefault(), $event.stopPropagation(), $scope.opened = !0
        }, $scope.removeContact = function(user, index) {
            user.restrictedContacts.splice(index, 1)
        }, $scope.addContact = function(user, contact) {
            var exists = !1;
            angular.forEach(user.restrictedContacts, function(elem) {
                elem.mail === contact.mail && elem.domain === contact.domain && (exists = !0, $log.info("The contact " + contact.mail + " has already been added to that guest's restricted contacts"))
            }), exists || user.restrictedContacts.push(contact)
        }, $scope.userRepresentation = function(u) {
            return u.firstName.concat(" ", u.lastName, " ", u.mail, " ", u.domain)
        }, $scope.searchGuestRestrictedContacts = function(pattern) {
            return User.autocomplete(pattern)
        }, $scope.reset = function() {
            $state.reinit()
        }, $scope.submit = function() {
            $scope.user.restricted || ($scope.user.restrictedContacts = []), User.update($scope.user)
        }, $scope.isGuest = function() {
            return "GUEST" === $scope.user.accountType
        }, $scope.goBackListBack = "user.detail" === $rootScope.routerState.current.name ? "user.list" : "inconsistentuser.list.detail" === $rootScope.routerState.current.name ? "inconsistentuser.list.all" : "inconsistentuser.search", $scope["delete"] = function() {
            var modalInstance = $modal.open({
                templateUrl: "ng_components/common/confirm_modal.tpl.html",
                controller: "ConfirmDialogCtrl",
                resolve: {
                    content: function() {
                        return "MANAGE_USERS.CONFIRM_DELETE_FORM.PARAGRAPH"
                    }
                }
            });
            modalInstance.result.then(function() {
                User.remove($scope.user).then(function() {
                    $scope.$parent.dataUpTodate = !1, $state.go($scope.goBackListBack)
                })
            }, function() {
                $log.debug("Deletion modal dismissed")
            })
        }, $scope.changeDomain = function(selectedUsers) {
            var modalInstance = $modal.open({
                templateUrl: "ng_components/user/user_changedomain_modal.tpl.html",
                controller: "ChangeDomainModalCtrl",
                resolve: {
                    allDomains: ["Domain", function(Domain) {
                        return Domain.getAll()
                    }],
                    selectedUsers: function() {
                        return selectedUsers
                    }
                }
            });
            modalInstance.result.then(function() {
                $scope.$parent.dataUpTodate = !1
            }, function() {
                $log.debug("Deletion modal dismissed")
            })
        }
    }]), angular.module("linshareAdminApp").controller("ChangeDomainModalCtrl", ["_", "$scope", "$log", "$modalInstance", "allDomains", "User", "selectedUsers", function(_, $scope, $log, $modalInstance, allDomains, User, selectedUsers) {
        $scope.allDomains = allDomains, $scope.validate = function() {
            $modalInstance.close()
        }, $scope.cancel = function() {
            $modalInstance.dismiss("cancel")
        }, angular.isArray(selectedUsers) || (selectedUsers = [selectedUsers]), $scope.selectedUsers = selectedUsers, $scope.submitDomain = function(selectedUsers, domain) {
            angular.forEach(selectedUsers, function(user, index) {
                user.domain = domain, user.isSelected && (user.isSelected = !1), User.updateInconsistent(_.omit(user, "isSelected")).then(function() {
                    selectedUsers.splice(index, 1), 0 === selectedUsers.length && $modalInstance.close()
                })
            })
        }
    }]), angular.module("linshareAdminApp").controller("UserListCtrl", ["_", "$scope", "$filter", "$log", "$translate", "ngTableParams", "User", "authenticatedUser", "$state", "Restangular", "$modal", function(_, $scope, $filter, $log, $translate, ngTableParams, User, authenticatedUser, $state, Restangular, $modal) {
        $scope.isCollapsed = !0, $scope.getTemplate = function() {
            return "USER"
        }, $scope.reloadList = function() {
            $scope.tableParams.reload()
        }, $scope.isSuperAdmin = "SUPERADMIN" === authenticatedUser.role, $scope.sendFile = function(selector) {
            $scope.migStateSuccess = !1;
            var csvFile = document.getElementById("fileInputCsv");
            void 0 === selector && (selector = ";");
            var formData = new FormData;
            formData.append("file", csvFile.files[0]), formData.append("filename", csvFile.files[0].name), formData.append("csvFieldDelimiter", selector), User.changeInternalUsersEmail(formData).then(function(state) {
                $scope.migState = state.data, $scope.migStateSuccess = !0
            }, function(error) {
                $scope.migState = error
            })
        };
        var confirmCreateUserProfile = function(user) {
            var modalInstance = $modal.open({
                templateUrl: "ng_components/common/confirm_modal.tpl.html",
                controller: "ConfirmDialogCtrl",
                resolve: {
                    content: function() {
                        return "MANAGE_USERS.CONFIRM_CREATE_PROFILE_FORM.PARAGRAPH"
                    }
                }
            });
            modalInstance.result.then(function() {
                Restangular.all("users").post(user).then(function(user) {
                    $state.go("user.detail", {
                        uuid: user.uuid
                    })
                })
            }, function() {
                $log.debug("Deletion modal dismissed")
            })
        };
        $scope.showUserDetail = function(user) {
            User.exist(user.uuid).then(function(success) {
                success ? $state.go("user.detail", {
                    uuid: user.uuid
                }) : confirmCreateUserProfile(user)
            })
        }, $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            sorting: {
                lastName: "asc"
            }
        }, {
            debugMode: !1,
            total: 0,
            getData: function($defer, params) {
                var canRequest = !1;
                angular.forEach(_.keys(params.filter()), function(key) {
                    params.filter()[key].length >= 3 && (canRequest = !0)
                }), canRequest && User.search(params.filter()).then(function(users) {
                    users = params.sorting() ? $filter("orderBy")(users, params.orderBy()) : users, params.total(users.length), $defer.resolve(users.slice((params.page() - 1) * params.count(), params.page() * params.count()))
                })
            }
        })
    }]), angular.module("linshareAdminApp").factory("MailActivation", ["$log", "Restangular", function($log, Restangular) {
        return {
            getAll: function(domainId, identifier) {
                return $log.debug("MailActivation:getAll"), Restangular.all("mail_activations").getList({
                    domainId: domainId,
                    parentId: identifier
                })
            },
            get: function(domainId, funcId) {
                return $log.debug("MailActivation:get"), Restangular.one("mail_activations", funcId).get({
                    domainId: domainId
                })
            },
            update: function(mailActivation) {
                return $log.debug("MailActivation:update"), mailActivation.put()
            },
            remove: function(mailActivation) {
                return $log.debug("MailActivation:remove"), mailActivation.remove()
            }
        }
    }]), angular.module("linshareAdminApp").controller("MailActivationDetailCtrl", ["_", "$scope", "$state", "currentMailActivation", "listMailActivation", function(_, $scope, $state, currentMailActivation, listMailActivation) {
        $scope.iconSaved = !1, $scope.view = !$state.params.view || "simple" !== $state.params.view && "advanced" !== $state.params.view ? "simple" : $state.params.view, $scope.mailActivation = currentMailActivation;
        var mailActivation = listMailActivation.sort(),
            indexOfMailActivation = _.indexOf(mailActivation, currentMailActivation.identifier);
        $scope.nextElem = mailActivation[indexOfMailActivation + 1], $scope.prevElem = mailActivation[indexOfMailActivation - 1]
    }]), angular.module("linshareAdminApp").controller("MailActivationCtrl", ["$scope", "$state", "$timeout", "MailActivation", function($scope, $state, $timeout, MailActivation) {
        var timeoutId, setIcon = function(value) {
            null == $scope.mailActivation.parentIdentifier ? $scope.iconSaved = value : $scope.$parent.$parent.$parent.iconSaved = value
        };
        $scope.displayIconSaved = function() {
            setIcon(!0), $timeout(function() {
                setIcon(!1)
            }, 800)
        }, $scope.showActivation = function() {
            return $scope.mailActivation.activationPolicy.parentAllowUpdate
        }, $scope.showConfiguration = function() {
            return "FORBIDDEN" !== $scope.mailActivation.activationPolicy.policy && $scope.mailActivation.configurationPolicy.parentAllowUpdate
        }, $scope.showDelegation = function() {
            return "FORBIDDEN" !== $scope.mailActivation.activationPolicy.policy && $scope.mailActivation.delegationPolicy && $scope.mailActivation.delegationPolicy.parentAllowUpdate
        }, $scope.showResetToParent = function() {
            return $scope.showDelegation() || $scope.showConfiguration() || $scope.showActivation()
        }, $scope.disableStatus = function(policyType) {
            return policyType ? "ALLOWED" !== policyType.policy : !1
        }, $scope.isRootDomain = function() {
            return "LinShareRootDomain" === $scope.mailActivation.domain
        };
        var updateMailActivation = function(mailActivation) {
            MailActivation.update(mailActivation).then(function() {
                $scope.displayIconSaved()
            })
        };
        $scope.updateWithTimeout = function() {
            angular.isDefined(timeoutId) && $timeout.cancel(timeoutId), timeoutId = $timeout(function() {
                $scope.update(), timeoutId = void 0
            }, 1500)
        };
        var updateStatus = function(policyType) {
            policyType && (policyType.status = "ALLOWED" === policyType.policy ? policyType.status : "MANDATORY" === policyType.policy)
        };
        $scope.update = function() {
            updateStatus($scope.mailActivation.activationPolicy), updateStatus($scope.mailActivation.configurationPolicy), updateStatus($scope.mailActivation.delegationPolicy), updateMailActivation($scope.mailActivation)
        }, $scope.resetToParent = function() {
            MailActivation.get($state.params.domainId, $scope.mailActivation.identifier).then(function(mailActivation) {
                MailActivation.remove(mailActivation).then(function() {
                    $state.reinit(), $scope.displayIconSaved()
                })
            })
        }, $scope.checkPolicyType = function(policyType) {
            policyType.status = policyType.defaultStatus
        }, $scope.changeStatusMailActivation = function() {
            updateMailActivation($scope.mailActivation)
        }, $scope.changeDelegationMailActivation = function() {
            $scope.mailActivation.delegationPolicy.status = $scope.mailActivation.delegationPolicy.status ? !0 : !1, $scope.mailActivation.delegationPolicy.policy = "ALLOWED", updateMailActivation($scope.mailActivation)
        }
    }]), angular.module("linshareAdminApp").directive("lsMailActivationDisplay", ["$rootScope", "$translate", "$compile", "$http", "$templateCache", function($rootScope, $translate, $compile, $http, $templateCache) {
        var baseURL = "ng_components/mailactivation/mailactivation_",
            typeTemplateMapping = {
                simple: "simple.tpl.html",
                advanced: "advanced.tpl.html"
            },
            getTemplate = function(identifier) {
                return "/i18n/templates/functionalities/" + $translate.use() + "/" + identifier + ".tpl.html"
            },
            getIdName = function(functionality, identifier) {
                return "MAIL_ACTIVATION.DETAILS." + functionality + identifier
            },
            linker = function(scope, element) {
                scope.isOpen = !1, scope.translations = {
                    DESCRIPTION: "",
                    ACTIVATION_POLICY: "",
                    CONFIGURATION_POLICY: "",
                    PARAMETER_DESCRIPTION: "",
                    DELEGATION_POLICY: "",
                    USE_EXTENDED_DESCRIPTION: ""
                };
                var initTraduction = function() {
                    angular.forEach(scope.translations, function(key, value) {
                        $translate(getIdName(scope.mailActivation.identifier, "." + value)).then(function(translation) {
                            scope.translations[value] = translation
                        })
                    })
                };
                scope.template = getTemplate(scope.mailActivation.identifier), initTraduction();
                var functionality = "MAIL_ACTIVATION.DETAILS." + scope.mailActivation.identifier + ".USE_EXTENDED_DESCRIPTION";
                $translate(functionality).then(function(translations) {
                    scope.translationValue = translations
                }), $rootScope.$on("$translateChangeSuccess", function() {
                    scope.template = getTemplate(scope.mailActivation.identifier), initTraduction()
                });
                var tplURL = baseURL + typeTemplateMapping[scope.view],
                    templateLoader = $http.get(tplURL, {
                        cache: $templateCache
                    }).success(function(html) {
                        element.html(html)
                    }).then(function() {
                        element.replaceWith($compile(element.html())(scope))
                    });
                return function(scope, element) {
                    templateLoader.then(function() {
                        element.html($compile(element.html())(scope))
                    })
                }
            };
        return {
            restrict: "E",
            link: linker,
            controller: "MailActivationCtrl"
        }
    }]), angular.module("linshareAdminApp").controller("MailActivationListCtrl", ["_", "$scope", "$filter", "$q", "$translate", "$state", "ngTableParams", "mailActivations", "currentDomain", function(_, $scope, $filter, $q, $translate, $state, ngTableParams, mailActivations, currentDomain) {
        $scope.domain = currentDomain,
            $scope.view = $state.params.view, $scope.isActivated = function(mailActivation) {
                return mailActivation.enable
            }, $scope.tableParams = new ngTableParams({
                page: 1,
                count: 30,
                sorting: {
                    identifier: "asc"
                }
            }, {
                debugMode: !1,
                total: 0,
                getData: function($defer, params) {
                    var nameFilter = params.filter().descriptionFilter,
                        deferred = $q.defer(),
                        orderedData = params.sorting() ? $filter("orderBy")(mailActivations, params.orderBy()) : mailActivations;
                    if (orderedData = params.filter ? $filter("filter")(orderedData, params.filter().identifier) : orderedData, _.isEmpty(nameFilter)) params.total(orderedData.length), $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    else {
                        var ids = _.pluck(orderedData, "identifier"),
                            mapIdentifierAndTranslationKey = _.map(ids, function(id) {
                                return "MAIL_ACTIVATION.DETAILS." + id + ".NAME"
                            });
                        $translate(mapIdentifierAndTranslationKey).then(function(translations) {
                            deferred.resolve(_.filter(orderedData, function(f) {
                                return -1 !== translations["MAIL_ACTIVATION.DETAILS." + f.identifier + ".NAME"].toLowerCase().indexOf(nameFilter.toLowerCase())
                            }))
                        }), deferred.promise.then(function(data) {
                            var legendFilteredData = params.sorting() ? $filter("orderBy")(data, params.orderBy()) : data;
                            params.total(legendFilteredData.length), $defer.resolve(legendFilteredData.slice((params.page() - 1) * params.count(), params.page() * params.count()))
                        })
                    }
                }
            })
    }]);