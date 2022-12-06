export class Course {
  public created_at: Date

  constructor(
    public title: string,
    public price: string,
    public image: string,
    public description?: '',
    public category?: '',
    public level?: '',
    public rating?: 0,
  ) {
    this.created_at = new Date()
  }
}
