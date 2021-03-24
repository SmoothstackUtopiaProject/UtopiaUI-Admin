class BaseReducer {
  static constantsParent = null;

  static initialize(constantsParent) {
    this.constantsParent = constantsParent;
    return this;
  }

  static getDefaultReducerState() {
    return defaultReducerState;
  }

  static reduce(action, state) {
    switch (action.type) {

      // Cancel
      // =====================================
      case this.constantsParent.cancel:
        return {
          create: defaultReducerState.create,
          delete: defaultReducerState.delete,
          edit: defaultReducerState.edit,
          error: "",
          search: {
            ...state.search,
            resultsPage: 1,
          },
          status: "SUCCESS",
        };

      // Errors
      // =====================================
      case this.constantsParent.error:
        return {
          error: action.payload || "[ERROR]: 404 - Not Found!",
          status: "ERROR",
        };

      // Health
      // =====================================
      case this.constantsParent.health:
        return {
          health: action.payload || "UNHEALTHY",
        };

      // Prompts
      // =====================================
      case this.constantsParent.promptCreate:
        return {
          create: {
            ...defaultReducerState.create,
            isActive: true,
          },
          delete: defaultReducerState.delete,
          edit: defaultReducerState.edit,
          status: "SUCCESS",
        };

      case this.constantsParent.promptDelete:
        return {
          create: defaultReducerState.create,
          delete: {
            ...defaultReducerState.delete,
            isActive: true,
          },
          edit: defaultReducerState.edit,
          selected: action.payload,
          status: "SUCCESS",
        };

      case this.constantsParent.promptEdit:
        return {
          create: defaultReducerState.create,
          delete: defaultReducerState.delete,
          edit: {
            ...defaultReducerState.edit,
            isActive: true,
          },
          selected: action.payload,
          status: "SUCCESS",
        };

      // Requests
      // =====================================
      case this.constantsParent.request:
        return {
          error: "",
          status: "PENDING",
        };

      case this.constantsParent.requestCreate:
        return {
          create: {
            ...defaultReducerState.create,
            isActive: true,
            status: "PENDING",
          },
        };

      case this.constantsParent.requestDelete:
        return {
          delete: {
            ...defaultReducerState.delete,
            isActive: true,
            status: "PENDING",
          },
        };

      case this.constantsParent.requestEdit:
        return {
          edit: {
            ...defaultReducerState.edit,
            isActive: true,
            status: "PENDING",
          },
        };

      // Responses
      // =====================================
      case this.constantsParent.response:
        return {
          error: "",
          search: {
            ...state.search,
            results: action.payload || [],
          },
          status: "SUCCESS",
        };

      case this.constantsParent.responseCreate:
        return {
          create: {
            ...state.create,
            results: action.payload.results,
            resultsStatus: action.payload.resultsStatus,
          },
        };

      case this.constantsParent.responseDelete:
        return {
          delete: {
            ...state.delete,
            results: action.payload.results,
            resultsStatus: action.payload.resultsStatus,
          },
        };

      case this.constantsParent.responseEdit:
        return {
          edit: {
            ...state.edit,
            results: action.payload.results,
            resultsStatus: action.payload.resultsStatus,
          },
        };

      // Search Results Filtering
      // =====================================
      case this.constantsParent.selectFilter:
        return {
          search: {
            ...state.search,
            filters: {
              ...state.search.filters,
              ...action.payload,
            },
          },
        };

      case this.constantsParent.selectItemsPage:
        return {
          search: {
            ...state.search,
            resultsPage: action.payload,
          },
        };

      case this.constantsParent.selectItemsPerPage:
        return {
          search: {
            ...state.search,
            resultsPage: 1,
            resultsPerPage: action.payload,
          },
        };

      // Select
      // =====================================
      case this.constantsParent.selectItem:
        return { selected: action.payload };

      // Reset
      // =====================================
      case this.constantsParent.reset:
        return this.getDefaultReducerState();

      default:
        if (this.chainReduce) return this.chainReduce(action, state);
        else console.error("Invalid action.type!", action);
        return null;
    }
  }
}
export default BaseReducer;

export const defaultReducerState = {
  create: {
    isActive: false,
    results: {},
    resultsStatus: "INACTIVE",
  },
  delete: {
    isActive: false,
    results: {},
    resultsStatus: "INACTIVE",
  },
  edit: {
    isActive: false,
    results: {},
    resultsStatus: "INACTIVE",
  },
  error: "",
  health: "UNHEALTHY",
  selected: {},
  search: {
    filters: {
      activeCount: 0,
    },
    results: [],
    resultsPage: 1,
    resultsPerPage: 10,
    resultsTotal: 0,
  },
  status: "INACTIVE",
};
