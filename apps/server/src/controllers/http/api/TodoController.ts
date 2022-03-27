import { Request, RequestHandler, Response, Router } from 'express';
import { In, LessThan, MoreThan } from 'typeorm';
import { Todo } from '../../../entities/Todo';
import { inputValidation } from '../../../middlewares/inputValidation';
import { todoValidationRules } from '../../../middlewares/validationRules/todoValidator';
import { ICreateTodoParams } from '../../../types/ITodo';
import { assertUserId } from '../../../utils/assertUserId';
import { tommorow } from '../../../utils/dateUtils';
import { logger } from '../../../utils/logger';

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
    this.router.get('/today', this.getTodayTodos);
    this.router.get('/overdue', this.getOverdueTodos);
    this.router.put('/reschedule-today', this.bulkUpdate);
    this.router.get('/:id', this.getTodo);
    this.router.put('/:id', this.updateTodo);

    this.router.post(
      '/',
      todoValidationRules(),
      inputValidation,
      this.createTodo,
    );
    this.router.use('*', (_, res) => res.sendStatus(404));
  }

  private getTodayTodos = async (req: Request, res: Response) => {
    try {
      assertUserId(req);
      const { id } = req.user;
      const todos = await Todo.find({
        where: {
          userId: id,
          dueDate: MoreThan(new Date()),
          completed: false,
        },
      });
      res.json(todos);
    } catch (error) {
      logger.error(error);
      res.status(500).send(error);
    }
  };

  private bulkUpdate = async (req: Request, res: Response) => {
    try {
      const updatedTodos = await Todo.update(
        { id: In(req.body.ids) },
        { dueDate: tommorow() },
      );
      res.json(updatedTodos);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  private updateTodo = async (req: Request, res: Response) => {
    try {
      const updatedTodo = await Todo.update(req.params.id, { ...req.body });
      res.json(updatedTodo);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  private getOverdueTodos = async (req: Request, res: Response) => {
    try {
      assertUserId(req);
      const { id } = req.user;
      const todos = await Todo.find({
        where: { userId: id, dueDate: LessThan(new Date()), completed: false },
      });
      res.json(todos);
    } catch (error) {
      logger.error(error);
      res.status(500).send(error);
    }
  };

  private getTodos = async (req: Request, res: Response) => {
    try {
      assertUserId(req);
      const { id } = req.user;
      const todos = await Todo.find({
        where: { userId: id },
      });
      res.json(todos);
    } catch (error) {
      res.status(500).send(error);
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
      assertUserId(req);
      const { id } = req.user;
      const userInput = req.body as ICreateTodoParams;
      const todo = await Todo.create({
        ...userInput,
        completed: false,
        userId: id,
      }).save();
      res.send(todo);
    } catch (error) {
      res.sendStatus(500).send(error);
    }
  };
}
