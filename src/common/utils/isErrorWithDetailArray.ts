/* Синтаксис error is { message: string } означает, что если функция возвращает true, TypeScript будет рассматривать
error как объект с обязательным строковым свойством message. */

export function isErrorWithDetailArray(error: unknown): error is { errors: { detail: string }[] } {
    return (
        typeof error === 'object' && // Проверяем, что error – это объект
        error !== null && // Убеждаемся, что это не null
        'errors' in error &&
        Array.isArray(error.errors) &&
        error.errors.length > 0 &&
        typeof error.errors[0].detail === 'string' // Убеждаемся, что это строка
    )
}