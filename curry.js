function curry(fn, arity, args) {
    // 闭包
    // arity用来记录fn函数的剩余的参数个数，第一次执行时不会传入arity
    var arity = arity || fn.length;
    // args用来收集参数，第一次执行时不会传入args，所以默认为空数组
    var args = args || [];
    
    return function () {
        // 将传入的参数转为数组
        var _args = [].slice.call(arguments);
        //  _args合并到args中（args是闭包中的变量，所以会一直存在，不断接收新的参数）
        [].push.apply(args, _args);
        // 如果新传入的参数个数小于剩余的参数个数，说明还没传满参数
        if (_args.length < arity) {
            // 因为新传进来了参数，剩余的参数个数减少
            arity = arity - _args.length;
            // 参数还没传满，返回出来一个新的函数
            return curry(fn, arity, args);
        }
        // 新传入的参数个数等于或大于剩余的参数个数，说明参数已经传满，此时执行fn函数，并将所有的参数一次性给他
        return fn.apply(this, args);
    }
}