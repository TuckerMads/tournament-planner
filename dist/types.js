"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserViewModel = toUserViewModel;
function toUserViewModel(user) {
    const currentYear = new Date().getFullYear();
    return {
        ...user,
        age: currentYear - user.birthYear
    };
}
