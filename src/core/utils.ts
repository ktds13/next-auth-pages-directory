export const isEmptyObject = (obj: Record<string, any>): boolean => {
    if (!obj) return true;
  
    if (obj instanceof Array) {
      return obj.length === 0;
    } else {
      for (const key in obj) {
        if (obj.prototype.hasOwnProperty.call(obj, key)) {
          return false;
        }
      }
      return true;
    }
  };
  