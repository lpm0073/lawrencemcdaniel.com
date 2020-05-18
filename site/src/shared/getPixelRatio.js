
export const getPixelRatio = context => {
    var backingStore = context.backingStorePixelRatio ||
                        context.webkitBackingStorePixelRatio ||
                        context.mozBackingStorePixelRatio ||
                        context.msBackingStorePixelRatio ||
                        context.oBackingStorePixelRatio ||
                        context.backingStorePixelRatio || 
                        1;
    
    return (window.devicePixelRatio || 1) / backingStore;
    }
