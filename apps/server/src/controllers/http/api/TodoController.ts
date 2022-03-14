import { Request, RequestHandler, Response, Router } from 'express';
import { Todo } from '../../../entities/Todo';
import { ITodo } from '../../../lib/ITodo';
import { inputValidation } from '../../../middlewares/inputValidation';
import { todoValidationRules } from '../../../middlewares/validationRules/todoValidator';

export class TodoController {
  private router: Router;

  constructor(private path: string, middlewares: RequestHandler[] = []) {
    this.router = Router();
    middlewares.forEach(middleware => this.router.use(middleware));
    this.addRoutes();
  }

  public register = (router: Router) => {
    router.use(this.path, this.router);
  };

  private addRoutes() {
    this.router.get('/', this.getTodos);
    this.router.get('/:id', this.getTodo);
    this.router.post(
      '/',
      todoValidationRules(),
      inputValidation,
      this.createTodo,
    );
    this.router.use('*', (_, res) => res.sendStatus(404));
  }

  private getTodos = async (req: Request, res: Response) => {
    console.log(req.user);
    try {
      const todos = await Todo.find();
      res.json(todos);
    } catch (error) {
      res.sendStatus(500).send(error);
    }
  };

  private getTodo = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const todo = await Todo.findOne(id);
      res.send(todo);
    } catch (error) {
      res.sendStatus(500).send(error);
    }
  };

  private createTodo = async (req: Request, res: Response) => {
    try {
      const userInput = req.body as Partial<ITodo>;
      const todo = await Todo.create(userInput).save();
      res.send(todo);
    } catch (error) {
      res.sendStatus(500).send(error);
    }
  };
}
