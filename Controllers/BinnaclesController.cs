using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using servicios_web_proyecto.Context;
using servicios_web_proyecto.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace servicios_web_proyecto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BinnaclesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BinnaclesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/<BinnaclesController>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(_context.Binnacles.ToList());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET api/<BinnaclesController>/5
        [HttpGet("{id}", Name = "GetBinnacle")]
        public ActionResult Get(int id)
        {
            try
            {
                var binnacle = _context.Binnacles.First(ct => ct.RecordId == id);
                return Ok(binnacle);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/<BinnaclesController>
        [HttpPost]
        public ActionResult Post([FromBody] Binnacle binnacle)
        {
            try
            {
                _context.Binnacles.Add(binnacle);
                _context.SaveChanges();
                return CreatedAtRoute("GetBinnacle", new { id = binnacle.RecordId }, binnacle);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<BinnaclesController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Binnacle binnacle)
        {
            try
            {
                if (binnacle.RecordId == id)
                {
                    _context.Entry(binnacle).State = EntityState.Modified;
                    _context.SaveChanges();
                    return CreatedAtRoute("GetBinnacle", new { id = binnacle.RecordId }, binnacle);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<BinnaclesController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                var binnacles = _context.Binnacles.First(ct => ct.RecordId == id);
                if (binnacles != null)
                {
                    _context.Binnacles.Remove(binnacles);
                    _context.SaveChanges();
                    return Ok(binnacles);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
