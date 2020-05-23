import { TaskService } from "@/api/tasks/TaskService";
import { ITask } from "@/common/interfaces/ITask";
import {ActionTree, GetterTree, MutationTree} from "vuex";

class State {
    tasks: TaskService[] = []
}

const getters: GetterTree<State, ITask[]> = {

}

const mutations: MutationTree<State> = {
    setTasks (state, tasks) {
        state.tasks = tasks;
    }
}

const actions: ActionTree<State, ITask[]> = {
    async getAllTasks ({ commit }) {
        commit('setTasks', await TaskService.getAllTasks());
    },
    async getTask ({ commit }, id) {
        const task = await TaskService.getTask(id);
        return task;
    },
    async addTask ({ commit }, payload) {
        commit('setTasks', await TaskService.addTask(payload.title, payload.description, false));
    },
    async deleteTask({ commit }, id) {
        commit('setTasks', await TaskService.deleteTask(id));
    },
    async updateTask ({ commit }, payload) {
        commit('setTasks', await TaskService.updateTask(payload.id, payload.options));
    }
}

export default {
    namespaced: true,
    state: () => new State(),
    getters,
    mutations,
    actions
}