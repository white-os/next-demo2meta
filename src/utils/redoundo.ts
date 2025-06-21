interface IAction {
  id: string;
  type: string;
  error?: boolean;
  timestamp?: number;
  data?: Record<string, unknown>;
}

export default class Redoundo {
  private actions: IAction[];
  private undoActions: IAction[];
  private readonly maxHistory: number;

  constructor(maxHistory: number = 50) {
    this.actions = [];
    this.undoActions = [];
    this.maxHistory = maxHistory;
  }

  add(action: IAction): void {
    if (!action.id || !action.type) {
      throw new Error('Action must have id and type');
    }
    
    action.timestamp = Date.now();
    this.actions.push(action);
    
    // 清空重做栈
    this.undoActions = [];
    
    // 如果超出最大历史记录，移除最旧的操作
    if (this.actions.length > this.maxHistory) {
      this.actions.shift();
    }
  }

  undo(): IAction | null {
    const action = this.actions.pop();
    if (action) {
      this.undoActions.push(action);
      return action;
    }
    return null;
  }

  redo(): IAction | null {
    const action = this.undoActions.pop();
    if (action) {
      this.actions.push(action);
      return action;
    }
    return null;
  }

  clear(): void {
    this.actions = [];
    this.undoActions = [];
  }

  getCurrentState(): IAction[] {
    return [...this.actions];
  }

  canUndo(): boolean {
    return this.actions.length > 0;
  }

  canRedo(): boolean {
    return this.undoActions.length > 0;
  }

  getHistoryLength(): number {
    return this.actions.length;
  }

  getUndoLength(): number {
    return this.undoActions.length;
  }
}